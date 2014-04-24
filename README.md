local-xhr-proxy
===============

A simple tool to add ```Access-Control-Allow-Origin: *``` response headers when developing an application locally, but connecting to remote API's.

*** Installation

```
# npm install -g xhrproxy
```

*** Usage

```
Serve all request from a remote server locally, appending an "Access-Control-Allow-Origin: *" header.
Usage: xhrproxy --server [remote address] --port [5050|local port]

Options:
  -s, --server  Remote server address
  -p, --port    Local port           
  --server                             [required]
  --port                               [default: 5050]
```
