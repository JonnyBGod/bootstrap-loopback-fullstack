module.exports = function startSocket(server) {

	server.io.on('connection', function (socket) {
		socket.userId = socket.handshake.accessToken.userId;

	    /*
	     When the user sends a chat message, publish it to everyone (including myself) using
	     Redis' 'pub' client we created earlier.
	     Notice that we are getting user's name from session.
	     */
	    socket.on('message', function (data) {
	    	server.pub.publish('queue', JSON.stringify(_data));
	    });

	    /*
	     When a user joins the channel, publish it to everyone (including myself) using
	     Redis' 'pub' client we created earlier.
	     Notice that we are getting user's name from session.
	     */
	    socket.on('join', function () {	
	        var reply = JSON.stringify({action: 'control', user: socket.handshake.accessToken.userId, msg: ' joined the channel' });
	        server.pub.publish('queue', reply);
	    });

	    socket.on('disconnect', function () {
		});
	});

	/*
     Use Redis' 'sub' (subscriber) client to listen to any message from Redis to server.
     When a message arrives, send it back to browser using socket.io
     */
    server.sub.on('message', function (channel, message) {
    	var data = JSON.parse(message.toString());
    	
		if (channel === 'queue') {

			/*
				Process queue
			 */
			var sockets = server.io.sockets.adapter.nsp.sockets.filter(function (e) { return data.room.users.indexOf(e.userId.toString()) !== -1 });
			
			for (var i = 0; i < sockets.length; i++) {
				sockets[i].emit(channel, data);
			};
		}
    });
};