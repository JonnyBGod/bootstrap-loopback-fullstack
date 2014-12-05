exports.config = {
  app_name : ['PROJECT-NAME'],
  license_key : 'LICENSE-KEY',
  logging : {
    level : 'info'
  },
  rules : {
    ignore : [
      '^/socket.io/.*/xhr-polling',
      '^/heartbeat.html'
    ]
  }
};