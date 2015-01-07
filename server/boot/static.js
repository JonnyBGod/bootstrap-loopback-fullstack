var path = require('path');

module.exports = function(server) {
  if (process.env.NODE_ENV !== 'development') return;

  var serveDir = server.loopback.static;

  server.use('/bower_components', serveDir(projectPath('bower_components')));
  server.use('/lbclient', serveDir(projectPath('client/lbclient')));

  server.use('/styles', serveDir(projectPath('client/.tmp/styles')));
  server.use('/', serveDir(projectPath('client')));
  server.use('/', function(req, res) {
    res.sendFile(projectPath('client/index.html'));
  });
};

function projectPath(relative) {
  return path.resolve(__dirname, '../..', relative);
}