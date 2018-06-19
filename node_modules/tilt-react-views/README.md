# tilt-react-views [![Build Status](https://secure.travis-ci.org/mklabs/tilt-react-views.png)](http://travis-ci.org/mklabs/tilt-react-views)

This module provides a `ReactViews` class to extend or mixin, that exposes the
necessary methods to compile and render React components from an HTTP response.

Inspiration from
[express-react-views](https://github.com/reactjs/express-react-views). This
package aims to offer a similar experience, but without Express.

## Install

    npm i tilt-react-views -S

## Usage

Views are JSX files automatically transpiled by `babel-register`, stored in the
`views` directory (as configured view `.views()` or `options.views`).

The default value is `./views` in the current working directory.

`views/index.jsx`
```js
var React = require('react');

var HelloMessage = React.createClass({
  render: function() {
    return (<div>Hello {this.props.name}</div>);
  }
});

module.exports = HelloMessage;
```

`server.js`

```js
const path       = require('path');
const ReactViews = require('tilt-react-views');

var views = new ReactViews({
  views: path.join(__dirname, 'views')
});

require('http').createServer((req, res) => {
  res.render = views.render.bind(views, req, res, next);
  res.render('index');
}).listen(3000);
```

Or within the stack of middleware, prior to the router handlers. This adds a
`.render()` method to the response object.

```js
const views = new ReactViews();
app.use((res, res, next) => {
  res.render = views.render.bind(views, req, res, next);
  next();
});

app.get('/', (req, res, next) => {
  // will render views/index.jsx
  res.render('index');
});
```

### Layouts

You can compose your views to decorate your component with a layout.

`views/index.jsx`

```js
var React  = require('react');
var Layout = require('./layout');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <Layout title={this.props.title}>
        <div>Hello {this.props.name}</div>
      </Layout>
    );
  }
});

module.exports = HelloMessage;
```
`views/layout.jsx`

```js
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head><title>{this.props.title}</title></head>
        <body>{this.props.children}</body>
      </html>
    );
  }
});
```

## Documentation

### new ViewsReact(options)

- `options`
  - `options.views`: Views directory to lookup from when rendering (default: 'view/')
  - `options.engine`: View extension to use (default: `jsx`)
  - `options.doctype`: Doctype to use with HTML markup (default: `<!doctype html>`)
  - `options.renderToString`: When truthy, force the output to be done with `renderToString` (default: `renderToStaticMarkup`)

### .render(req, res, next, view, props)

Ends the response with `Homepage` component HTML markup

```js
res.render = views.render.bind(views, req, res, next);
res.render('homepage', {
  title: 'Homepage',
  description: 'Server side react rendering'
});
```

### .views(path)

Set the views directory to seach template from.

### .engine(ext)

Get or set the file extension to use when loading views.

### .react(filename, options)

Require the transpiled component by Babel and creates a new React
element. The resulting HTML is sent back to the client.


## Tests

Run with `npm test`.

```js
var views = new ViewsReact();
views.views(path.join(__dirname, 'views'));

var app = http.createServer((req, res) => {
  res.render = views.render.bind(views, req, res, done);
  res.render('index', { title: 'Foo' });
});

request(app)
  .get('/')
  .expect(/<!doctype html>/)
  .expect(/<html/)
  .expect(/<head>/)
  .expect(/Foo<\/title>/)
  .expect(/Hello/)
  .expect(200, done);
```

---

> [MIT](./LICENSE) &nbsp;&middot;&nbsp;
> [mkla.bz](http://mkla.bz) &nbsp;&middot;&nbsp;
> [@mklabs](https://github.com/mklabs)
