// User(bajtos) Move the bi-di replication to loopback core,
// add model settings to enable the replication.
// Example:
//  LocalUser: { options: {
//    base: 'User',
//    replicate: {
//      target: 'Todo',
//      mode: 'push' | 'pull' | 'bidi'
//    }}}
module.exports = function(client) {
  var LocalUser = client.models.LocalUser;
  var RemoteUser = client.models.user;

  var LocalChatRoom = client.models.LocalChatRoom;
  var RemoteChatRoom = client.models.chatRoom;

  client.network = {
    _isConnected: true,
    get isConnected() {
      console.log('isConnected?', this._isConnected);
      return this._isConnected;
    },
    set isConnected(value) {
      this._isConnected = value;
    }
  };

  // setup model replication
  function syncUser(cb) {
    if (client.network.isConnected && window.currentUserId) {
      RemoteUser.replicate(-1, LocalUser, { filter: { where: { id: window.currentUserId, include: 'events' }}}, function() {
        LocalUser.replicate(-1, RemoteUser, { filter: { where: { id: window.currentUserId, include: 'events' }}}, cb);
      });
    }
  }

  function syncChatRoom(cb) {
    if (client.network.isConnected && window.currentUserId) {
      RemoteChatRoom.replicate(-1, LocalChatRoom, { filter: { where: { users: window.currentUserId }}}, function() {
        LocalChatRoom.replicate(-1, RemoteChatRoom, { filter: { where: { users: window.currentUserId }}}, cb);
      });
    }
  }

  // sync local changes if connected
  LocalUser.on('changed', syncUser);
  LocalUser.on('deleted', syncUser);
  LocalChatRoom.on('changed', syncChatRoom);
  LocalChatRoom.on('deleted', syncChatRoom);

  client.syncUser = syncUser;
  client.syncChatRoom = syncChatRoom;
};
