const fs           = require('fs');
const path         = require('path');
const util         = require('util');
const glob         = require('glob');
const debug        = require('debug')('tilt-asset');
const browserify   = require('browserify');
const postcss      = require('postcss');
const http         = require('http');
const resolve      = require('resolve');

// Public: Asset pipeline
//
// This class implements a basic asset pipeline based on file extension.
//
// - `.js`  -> Goes through browerify with babelify transform
// - `.css` -> Goes through postcss with autoprefixer plugin
class Asset {

  // Public: Filetype to method handlers mapping
  get handlers() {
    return {
      '.js':  'browserify',
      '.css': 'postcss'
    };
  }

  constructor(options = {}) {
    this.options = options;
    this.options.baseURL = this.options.baseURL || '/assets/';
    this.dirs = this.options.dirs || 'app/assets/';

    if (this.dirs.charAt(this.dirs.length - 1) !== '/') throw new Error('"dirs" options must end with a "/"');

    this.regex = new RegExp('^' + this.options.baseURL);
    debug('Asset handler created', this.options);
    debug('Will strip out ^%s from incoming request URLs and look in %s directories', this.options.baseURL, this.dirs);
  }

  // Public: Main request handler
  handle(req, res, next) {
    next = next || function(err) {
      if (err) throw err;
    };

    var filename = path.join(this.dirs, req.url.replace(this.regex, ''));

    debug('Asset %s (Lookup %s)', req.url, filename);
    return glob(filename, (err, files) => {
      if (err) return next(err);
      if (!files.length) return next(new Error('Asset ' + filename + ' not found'));

      var file = files[0];

      debug('Asset found:', file);
      return this.compile(file, res, next);
    });
  }

  compile(file, stream, next) {
    var ext = path.extname(file);

    var handler = this.handlers[ext];
    if (!handler) return next('Filetype ' + ext + ' not supported');

    debug('Compile using %s handler', this.handlers[ext]);
    var method = this[handler];
    method.apply(this, arguments);
  }

  browserify(file, stream, next) {
    return this.resolve(file)
      .then((result) => {
        var options = Object.assign({ entries: [ file ] }, result.pkg.browserify);
        debug('Browserify', result.pkg.browserify);

        var b = browserify(Object.assign({ entries: [ file ] }, options));

        var bundle = b.bundle();
        b.on('error', this.error('Browserify error', next));
        bundle.on('error', this.error('Browserify error', next));

        if (stream instanceof http.ServerResponse) stream.writeHead(200, {
          'Content-Type': 'application/javascript'
        });

        bundle.pipe(stream);
      })
      .catch(next);
  }

  postcss(file, stream, next) {
    return this.resolve(file)
      .then(this.read)
      .then((result) => {
        var options = result.pkg.postcss || {};
        options.use = options.use || [];

        debug('PostCSS %s file', file, options);
        var processors = options.use.map((name) => {
          var plugin = this.require(name);
          return name in options ? plugin(options[name]) : (plugin.postcss || plugin());
        });

        return postcss(processors)
          .process(result.content, options)
          .catch(this.error('Postcss error', next))
          .then((result) => {
            if (stream instanceof http.ServerResponse) stream.writeHead(200, {
              'Content-Type': 'text/css'
            });

            stream.end(result.css);
          });
      })
      .catch(next);
  }

  resolve(file) {
    return new Promise((r, errback) => {
      resolve(path.resolve(file), (err, res, pkg) => {
        if (err) return errback(err);
        return r({
          res: res,
          pkg: pkg
        });
      });
    });
  }

  read(result) {
    return new Promise((r, errback) => {
      fs.readFile(path.resolve(result.res), 'utf8', (err, body) => {
        if (err) return errback(err);
        result.content = body;
        return r(result);
      });
    });
  }

  require(filepath) {
    debug('Attempt to require %s', filepath);
    try {
      return require(filepath);
    } catch(err) {
      debug(err.message);
      err = new Error(util.format('Error loading %s. Try running: npm install %s --save', filepath, filepath));
      debug(err.message);
      throw err;
    }
  }

  error(msg, next) {
    return function error(e) {
      msg = msg || e.message;
      debug(msg, e);
      return next(typeof e === 'string' ? new Error(e) : e);
    }
  }
}

module.exports = Asset;
