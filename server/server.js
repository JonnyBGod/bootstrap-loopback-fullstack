if (process.env.NODE_ENV !== 'development') {
  require('newrelic');
}

var loopback = require('loopback');
var boot = require('loopback-boot');

var path = require('path'),
  fs = require("fs");

var app = module.exports = loopback();

/*
	Remove if socket.io is not needed
 */
var redis = require('redis');

app.io = require('socket.io')();
app.sub = redis.createClient(6379, 'localhost', {return_buffers: true});
app.pub = redis.createClient(6379, 'localhost', {return_buffers: true});
app.sub.setMaxListeners(0);
app.sub.subscribe('queue');
/* Stop remove */

// Create an instance of PassportConfigurator with the app instance
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

app.use(loopback.token({model: app.models.AccessToken}));
app.use(loopback.json());
app.use(loopback.urlencoded({ extended: false }));
// -- Add your pre-processing middleware here --
if (process.env.NODE_ENV === 'development') {
  app.use(require('connect-livereload')({
        port: 35729
    }));
}

// boot scripts mount components like REST API
boot(app, __dirname);

// Load the provider configurations
var config = {};
try {
 config = require('./providers.json');
} catch(err) {
 console.error('Please configure your passport strategy in `providers.json`.');
 console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
 process.exit(1);
}

config["facebook-login"].profileToUser = function(provider, profile) {
	// Let's create a user for that
  var email = profile.emails && profile.emails[0] && profile.emails[0].value;
  if (!email) {
    // Fake an e-mail
    email = (profile.username || profile.id) + '@loopback.'
      + (profile.provider || provider) + '.com';
  }
  var username = provider + '.' + (profile.username || profile.id);
  var password = utils.generateKey('password');

  var photo = false;
  if (provider.indexOf('facebook') != -1) {
  	photo = '//graph.facebook.com/'+ profile.id +'/picture?type=normal';
  }
  var userObj = {
    username: username,
    password: password,
    email: email,
    photo: photo
  };
  return userObj;
}
// Initialize passport
var passport = passportConfigurator.init(true);
// Set up related models
passportConfigurator.setupModels({
 userModel: app.models.user,
 userIdentityModel: app.models.userIdentity,
 userCredentialModel: app.models.userCredential
});
// Configure passport strategies for third party auth providers
for(var s in config) {
 var c = config[s];
 c.session = c.session !== false;
 passportConfigurator.configureProvider(s, c);
}

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
//   app.use(loopback.static(path.resolve(__dirname', '../client')));

if (process.env.NODE_ENV === 'development') {
  app.use('/bower_components', loopback.static(path.resolve(__dirname, '../bower_components')));
  app.use('/styles', loopback.static(path.resolve(__dirname, '../website/.tmp/styles')));
  app.use('/', loopback.static(path.resolve(__dirname, '../website')));
  app.use('/', loopback.static(path.resolve(__dirname, '../client')));
  app.use('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../website/index.html'));
  });
}

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  var server = require('http').createServer(app);
  
  server.listen(process.env.PORT || 3000, function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });

  app.io.attach(server);
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
