var http = require('http');
var express = require("express");

/* your app config here */

var defaultOptions = {
  // host to forward to
  host:   'localhost',
  // port to forward to
  port:   4503
};

Object.spawn = function (parent, props) {
  var defs = {}, key;
  for (key in props) {
    if (props.hasOwnProperty(key)) {
      defs[key] = {value: props[key], enumerable: true};
    }
  }
  return Object.create(parent, defs);
}

var proxy = function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var options = Object.spawn(defaultOptions, {
    // path to forward to
    path:   req.url,
    // request method
    method: req.method,
    // headers to send
    headers: req.headers
  });

  var creq = http.request(options, function(cres) {

    // set encoding
    cres.setEncoding('utf8');

    // wait for data
    cres.on('data', function(chunk){
      res.send(chunk);
    });

    cres.on('close', function(){
      // closed, let's end client request as well 
      res.status(cres.statusCode);
      next();
    });

  }).on('error', function(e) {
    // we got an error, return 500 error to client and log error
    console.log(e.message);
    res.status(500);
    next();
  });

  creq.end();
}

var logger = function(req, res, next) {
    console.log("Received request: " + req.originalUrl);
    next(); 
}

var app = express();
var port = process.env.PORT || 8888;

app.configure(function(){
    app.use(logger); // Here you add your logger to the stack.
    app.use(proxy);
    app.use(app.router); // The Express routes handler.
});

console.log("Running on " + port);
app.listen(port);

