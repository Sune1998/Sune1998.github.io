var http = require('http');
var fs = require('fs');
const server = http.createServer(function (request, response) {
  if(request.url == '/') {
      request.url = '/index.html'
    }
  fs.readFile('./' + request.url, function(err, data) {
    if (!err) {
      console.log ('file found: ' + request.url);
        var dotoffset = request.url.lastIndexOf('.');
        var mimetype = dotoffset == -1
                        ? 'text/plain'
                        : {
                            '.html' : 'text/html',
                            '.ico' : 'image/x-icon',
                            '.jpg' : 'image/jpeg',
                            '.png' : 'image/png',
                            '.gif' : 'image/gif',
                            '.css' : 'text/css',
                            '.js' : 'text/javascript'
                            }[ request.url.substr(dotoffset) ];
        response.setHeader('Content-type' , mimetype);
        response.end(data);
        console.log( request.url, mimetype );
    } else {
        console.log ('file not found: ' + request.url);
        response.writeHead(404, "Not Found");
        response.end();
    }
  });
})

const port = process.env.PORT || 8080;
server.listen(port);