if (process.env.NODE_ENV !== 'development') {
    require('newrelic');
}

var loopback = require('loopback');
var boot = require('loopback-boot');

var redis = require('redis');

var path = require('path'),
	fs = require("fs");

var app = module.exports = loopback();
app.io = require('socket.io')();
var env = process.env.NODE_ENV || 'production';

// Create an instance of PassportConfigurator with the app instance
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
app.passportConfigurator = new PassportConfigurator(app);

/*
 Create two redis connections. A 'pub' for publishing and a 'sub' for subscribing.
 Subscribe 'sub' connection to 'chat' channel.
*/

app.sub = redis.createClient(6379, 'localhost', {return_buffers: true});
app.pub = redis.createClient(6379, 'localhost', {return_buffers: true});
app.sub.setMaxListeners(0);
app.sub.subscribe('chat');

// request pre-processing middleware
app.use(loopback.token({model: app.models.AccessToken}));
app.use(loopback.json());
app.use(loopback.urlencoded({ extended: false }));

if (env === 'development') {
	app.use(require('connect-livereload')({
        port: 35729
    }));

    app.get('*', function(req, res, next){
        if (!req.secure && !req.isSpdy) {
            res.redirect(301, "https://" + req.headers.host + req.url);
        } else {
            next();
        }
    });
}

// boot scripts mount components like REST API
boot(app, __dirname);

if (env === 'development') {
    var spdyOptions = {
        key : fs.readFileSync(__dirname + '/../server.key'),
        cert: fs.readFileSync(__dirname + '/../server.pem'),
        ca: fs.readFileSync(__dirname + '/../gd_bundle.crt'),
        ssl: true
    };
    var http = require('http').createServer(app),
        server = require('https').createServer(spdyOptions, app);
    
    http.listen(process.env.NODE_ENV == 'development' ? 50447 : process.env.PORT || 80, function(){
        console.log("http server started");
    });
    server.listen(process.env.NODE_ENV == 'development' ? 50337 : process.env.PORT_SSL || 443, function(){
        console.log("Server started");
    });
} else {
	var server = app.listen(function() {
		app.emit('started', app.get('url'));
		console.log('Web server listening at: %s', app.get('url'));
	});
}

app.io.attach(server);
