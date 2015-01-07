module.exports = function startSocket(server) {
	
	function findForRequest (req, options, cb) {
		var id = tokenIdForRequest(req, options);

		if(id) {
			server.models.AccessToken.findById(id, function(err, token) {
				if(err) {
				    cb(err);
				} else if(token) {
				    token.validate(function(err, isValid) {
				      	if(err) {
				        	cb(err);
				      	} else if(isValid) {
				        	cb(null, token);
				      	} else {
					        var e = new Error('Invalid Access Token');
					        e.status = e.statusCode = 401;
					        cb(e);
				      	}
				    });
				} else {
					var e = new Error('Missing Access Token');
			        e.status = e.statusCode = 401;
			        cb(e);
				}
			});
		} else {
			process.nextTick(function() {
			  	var e = new Error('Missing Access Token');
		        e.status = e.statusCode = 401;
		        cb(e);
			});
		}
	}

	function tokenIdForRequest(req, options) {
	  var query = options.query || [];
	  var headers = options.headers || [];
	  var i = 0;
	  var length;
	  var id;

	  query = query.concat(['access_token']);
	  headers = headers.concat(['X-Access-Token', 'authorization']);

	  for(length = query.length; i < length; i++) {
	    id = req.query[query[i]];

	    if(typeof id === 'string') {
	      return id;
	    }
	  }

	  for(i = 0, length = headers.length; i < length; i++) {
	    id = req.headers[headers[i]];

	    if(typeof id === 'string') {
	      // Add support for oAuth 2.0 bearer token
	      // http://tools.ietf.org/html/rfc6750
	      if (id.indexOf('Bearer ') === 0) {
	        id = id.substring(7);
	        // Decode from base64
	        var buf = new Buffer(id, 'base64');
	        id = buf.toString('utf8');
	      }
	      return id;
	    }
	  }
	  return null;
	}

	server.io.use(function (socket, next) {
	  	if (socket.handshake.accessToken !== undefined) return next();
		findForRequest(socket.handshake, {params: []}, function(err, token) {
		  socket.handshake.accessToken = token || null;
		  next(err);
		});
	});

	var chatRoom = server.models.chatRoom;
	var User = server.models.user;
	var Event = server.models.Event;
	var ObjectID = Event.dataSource.ObjectID;

	server.io.on('connection', function (socket) {
		socket.userId = socket.handshake.accessToken.userId;
	    //if(!socket.client.request.user) return;

	    /*
	     When the user sends a chat message, publish it to everyone (including myself) using
	     Redis' 'pub' client we created earlier.
	     Notice that we are getting user's name from session.
	     */
	    socket.on('chat', function (data) {
	    });

	    /*
	     When a user joins the channel, publish it to everyone (including myself) using
	     Redis' 'pub' client we created earlier.
	     Notice that we are getting user's name from session.
	     */
	    socket.on('join', function () {
	    });

	    socket.on('disconnect', function () {
		});
	});

	/*
     Use Redis' 'sub' (subscriber) client to listen to any message from Redis to server.
     When a message arrives, send it back to browser using socket.io
     */
    server.sub.on('message', function (channel, message) {

    });
};