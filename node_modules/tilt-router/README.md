# tilt-router [![Build Status](https://secure.travis-ci.org/mklabs/tilt-router.png)](http://travis-ci.org/mklabs/tilt-router)

> Class based HTTP router

Compatible with **Express 4**, **Hapi** or **simple HTTP server**.

Lightweight, has only [debug](https://www.npmjs.com/package/debug) and
[path-to-regexp](https://www.npmjs.com/package/path-to-regexp) dependencies.

This module is a follow-up to [ES6 Class based Express
routing](http://mkla.bz/2016/04/20/es6-class-express-routing.html) blog post.

## Installation

    npm install mklabs/tilt-router -S

## Usage

Instead of writing `app.get('/', function() {});` or `server.router({ method:
'GET', path: '/', handler: function() {}})` to define request handlers, you use
a Class to hold methods registered as route handlers to the underlying
framework, Express or Hapi.

Additionnaly, it implements a simple routing mechanism with raw HTTP server.

```js
import TiltRouter from 'tilt-router'

class Router extends TiltRouter {
  get routes() {
    '/': 'index'
  }

  index(req, res) {
    console.log('Incoming request:', req.url);
    return res.send('Response from server');
  }
}
```

### Express

```js
var app = require('express')();
var router = new Router(app);
app.listen(3000);
```

Or

```js
var app = require('express')();
app.use(Router.middleware(app));
app.listen(3000);
```

### Standard http server

```js
var router = new Router();
router.listen(3000);
```

Or

```js
var http = require('http');
http.createServer(Router.middleware()).listen(3000);
```

Or

```js
Router.createServer().listen(3000);
```

Or

```js
Router.listen(3000);
```

## Documentation

   - [Router](#router)
     - [API](#router-api)
     - [HTTP response](#router-http-response)

<a name="router"></a>
### Router
<a name="router-api"></a>
#### API
Router.createServer().

```js
Router.createServer().listen(PORT, done);
```

Router.listen().

```js
Router.listen(PORT, done);
```

Router.create().

```js
var router = Router.create();
assert.ok(router instanceof Router);
```

Router.dispatch() - express middleware.

```js
app.use(Router.middleware(app));
```

Router.dispatch() - HTTP server.

```js
http.createServer(Router.middleware());
```

App extends Router.

```js
class App extends Router {
  get routes() {
    return {
      '/': 'index'
    };
  }
  index(req, res, next) {
    return res.end('OK');
  }
}
var app = new App();
app.listen(PORT, done);
```

<a name="router-http-response"></a>
## HTTP response
GET /.

```js
request(this.app)
  .get('/')
  .expect('OK')
  .expect(200, done);
```

404.

```js
var server = TestApp.createServer();
request(this.app)
  .get('/aoizheuaziouh')
  .expect(404, done);
```

---

> [MIT](./LICENSE) &nbsp;&middot;&nbsp;
> [mkla.bz](http://mkla.bz) &nbsp;&middot;&nbsp;
> [@mklabs](https://github.com/mklabs)
