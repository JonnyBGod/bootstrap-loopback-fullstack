var path = require('path');
var utils = require('./../lib/utils');

module.exports = function(server) {
	// Load the provider configurations
	var config = {};
	//try {
		config = require(path.resolve(__dirname, '../', 'providers.json'));
	//} catch(err) {
	//	console.error('Please configure your passport strategy in `providers.json`.');
	//	console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
	//	process.exit(1);
	//}

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
	var passport = server.passportConfigurator.init(true);
	// Set up related models
	server.passportConfigurator.setupModels({
	 userModel: server.models.user,
	 userIdentityModel: server.models.userIdentity,
	 userCredentialModel: server.models.userCredential
	});
	// Configure passport strategies for third party auth providers
	for(var s in config) {
	 var c = config[s];
	 c.session = c.session !== false;
	 server.passportConfigurator.configureProvider(s, c);
	}
};
