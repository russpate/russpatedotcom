const fs       = require('fs');
const path     = require('path');
const debug    = require('debug')('tilt-react-views');
const React    = require('react');
const ReactDOM = require('react-dom/server');

module.exports = class ReactViews {

  constructor(options) {
    this.options = options || {};
    this.views(this.options.views || path.resolve('views'));
    this.engine(this.options.engine || 'jsx');
  }

  views(paths) {
    if (!paths) throw new Error('Missing paths');

    paths = Array.isArray(paths) ? paths : [paths];

    debug('Set views', paths);

    require('babel-register')({
      presets: [ 'react', 'es2015' ],
      only: this.only.bind(this, paths)
    });

    this._views = paths;
    return this;
  }

  only(paths, filename) {
    return !!paths.find((dir) => {
      return filename.indexOf(dir) === 0;
    });
  }

  engine(ext) {
    if (!ext) return this._viewEngine;
    this._viewEngine = ext;
    return this;
  }

  render(req, res, next, view, options) {
    options = options || {};

    debug('Rendering view %s', view);

    return this.view(view)
      .catch(next)
      .then((template) => {
        if (!template) return;

        res.setHeader('Content-Type', 'text/html');
        try {
          res.end(this.react(template, Object.assign({}, options, this.options)));
        } catch (e) {
          return next(e);
        } finally {
          if (process.env.NODE_ENV === 'production') return;

          // Borrowed from: https://github.com/reactjs/express-react-views/blob/master/index.js#L58
          // Remove all files from the module cache that are in the view folders.
          Object.keys(require.cache).forEach((module) => {
            var filename = require.cache[module].filename;
            if (this.only(this._views, filename)) {
              delete require.cache[module];
            }
          });
        }
      });
  }

  view(filename, locations) {
    return new Promise((r, errback) => {
      locations = locations || this._views.map(dir => path.join(dir, filename + '.jsx'));
      var file = locations.shift();

      debug('Lookup view: %s', file);
      if (!file) return errback(new Error('View ' + filename + ' not found'));

      fs.stat(file, (err, stat) => {
        if (err && err.code === 'ENOENT') {
          return this.view(filename, locations).catch(errback).then(r);
        }
        if (err) return errback(err);
        return r(file);
      });
    });
  }

  react(filename, options) {
    var component = require(filename);

    // Transpiled ES6 may export components as { default: Component }
    component = component.default || component;
    var html = options.doctype || '<!doctype html>'
    var element = React.createElement(component, options);
    var method = this.options.renderToString ? 'renderToString' : 'renderToStaticMarkup';
    html += ReactDOM[method](element);
    return html;
  }
}
