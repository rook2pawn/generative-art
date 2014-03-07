var http = require('http');
var ecstatic = require('ecstatic');
var path = require('path');

var server = http.createServer(ecstatic(path.join(__dirname)));
server.listen(1234);
