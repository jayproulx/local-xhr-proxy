#! /usr/bin/env node

var http = require('http'),
    httpProxy = require('http-proxy');

var argv = require('optimist')
	.usage('Serve all request from a remote server locally, appending an "Access-Control-Allow-Origin: *" header.\nUsage: $0 --server [remote address] --port [5050|local port]')
	.demand('server')
	.alias('s', 'server')
	.describe('s', 'Remote server address')
	.alias('p', 'port')
	.describe('p', 'Local port')
	.default('port', 5050)
	.argv;

var proxy = httpProxy.createProxyServer({});

var server = require('http').createServer(function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	proxy.web(req, res, { target: argv.s });
});

console.log("Routing requests to", argv.s, "over port", argv.p);
console.log("Press Ctrl-C to exit.");
server.listen(argv.p);
