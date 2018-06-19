const fs           = require('fs');
const path         = require('path');
const debug        = require('debug')('tilt:router');
const TiltRouter   = require('tilt-router');
const pathToRegexp = require('path-to-regexp');

class Router extends TiltRouter {
  // TODO: di
  constructor(db) {
    super();
    this.db = db;
  }

  match(req) {
    // figure out which route to invoke based on url
    var pattern = pathToRegexp(req.url);
    var route = this._routes.find((route) => {
      return req.method.toLowerCase() === route.verb && pattern.test(route.path);
    });

    return !!route;
  }

  static middlewares(middlewares = [], req, res, next) {
    var stack = middlewares.concat();
    (function nextMiddleware(middleware) {
      if (!middleware) return next();

      debug('Middleware:', middleware.name);
      middleware(req, res, (err) => {
        if (err) return next(err);
        nextMiddleware(stack.shift());
      });
    })(stack.shift());
  }


  // Main HTTP request handler
  static handle(options = {}) {
    var asset = options.asset;
    var middlewares = options.middlewares || [];

    return function (req, res) {
      debug('Incoming request', req.url);

      // Assets
      if (asset && /^\/assets\//.test(req.url)) return asset.handle(req, res, (err) => {
        if (err) return Router.error(err, req, res);
      });

      // Middleware stack
      Router.middlewares(middlewares, req, res, (err) => {
        if (err) return Router.error(err, req, res);
        return Router.notFound(req, res);
      });
    };
  }

  static error(err, req, res) {
    debug('Internal server error for', req.url);
    if (!res._header) res.setHeader('Content-Type', 'text/html');
    res.statusCode = 500;
    res.end('Error: ' + process.env.NODE_ENV === 'production' ? err.message : err.stack);
  }

  static notFound(req, res) {
    debug('No route found for', req.url);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    fs.createReadStream(path.join(__dirname, 'resources/404.html')).pipe(res);
  }
}


module.exports = Router;
