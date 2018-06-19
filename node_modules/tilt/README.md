# tilt [![Build Status](https://secure.travis-ci.org/mklabs/tilt.png)](http://travis-ci.org/mklabs/tilt)

> wip

Minimalist, ES6 based, developer-friendly web framework for node.

Inspired by Play Framework and Sails / Trails, Tilt aims to be a lightweight
framework to quickly develop new nodejs application using a set of common tools
that works well together.

* **Routers / Controllers**
  [tilt-router](https://github.com/mklabs/tilt-router) Standard ES6 Class
  defines the mapping between URLs pattern and request handlers
* **Views** [tilt-react-views](https://github.com/mklabs/tilt-react-views) Views are built using React Components through `res.render()` method
* **Models** Models are ES6 Class that extends `tilt.Model` to offer a thin
  abstraction on top of [Sequelize](http://docs.sequelizejs.com/en/latest/).
* **Modular architecture** [Glob](https://github.com/isaacs/node-glob) patterns
  are used to load Controllers, Models and configure directories. Supports
  multiple Views, assets and static directories allowing any kind of file
  structure.
* **Asset pipeline** [tilt-assets](https://github.com/mklabs/tilt-assets)
  implements a basic Asset pipeline for any `/assets/*.{js,css}` URLs. JS files
  are compiled down to ES6 using Browserify with Babelify transform. CSS files
  are processed by PostCSS and autoprefixer plugin.

## wip

> wip: [todo](https://github.com/mklabs/tilt/issues/8)

## 🐰  Development documentation


    git clone https://github.com/mklabs/tilt.git
    cd tilt

    # Run babel / test on source changes
    npm run watch

    # Start example app
    npm start

- `npm start` to start the server. It'll run babel once before and use nodemon to restart the server if needed.
- `npm run watch` will recompile and relaunch the tests.

The lib/ folder is where sources are, the src/ folder are where generated sources are.

## Example

```js
var path = require('path');
var tilt = require('tilt');

var app = tilt();

app
  // Controllers, default: app/controllers/*
  .controllers(path.join(__dirname, 'app/controllers/*'))

  // Same for models
  .models(path.join(__dirname, 'app/models/*'))

  // Views directories, default: app/views/ (must end with a "/")
  .views(path.join(__dirname, 'app/views/'))


  // Static / public directories, default: app/public/
  .static(path.join(__dirname, 'app/public/'))

  // Assets directories, default: disabled
  .assets(path.join(__dirname, 'app/assets/'))

  // Custom middlewares
  .use(require('morgan')('dev'));

  // Start the server
  .start(function(err) {
    if (err) throw err;
    console.log('Server started');
  });
```

### Routers / Controllers

**app/controllers/main.js**

Controllers (or Routers) are standard ES6 Class that inherits from `tilt.Controller`.

They implement a `routes` hash that defines the mapping between URLs pattern
and class methods / request handlers.

`req` and `res` are standard node HTTP request and response.

```js
var Controller = require('tilt').Controller;

class Router extends Controller {
  get routes() {
    return {
      '/': 'index'
    };
  }

  index(req, res) {
    return res.render('index', { name: 'Title!' });
  }
}

module.exports = Router;
```

### Views

**app/views/index.jsx**

`res.render(filename, { ... })` is used to render React components and serve
the resulting HTML.

React JSX views are automatically transpiled by Babel when the framework
requires them.

```js
import React from 'react';

class HelloMessage extends React.Component {
  render() {
    return (<div>Hello {this.props.name}</div>);
  }
}

module.exports = HelloMessage;
```

### Models

**app/models/user.js**

Models inherits from `tilt.Model` to provide a thin abstraction on top of
[Sequelize](http://docs.sequelizejs.com/en/latest/).

Both attributes and options getters maps the `sequelize.define('name',
{attributes}, {options})` equivalent.

- `attributes` Specifiy the Model schema ([Model Definition](http://docs.sequelizejs.com/en/latest/docs/models-definition/))
- `options` Specifiy the Model options

Most of [Sequelize Model API](http://docs.sequelizejs.com/en/latest/api/model/) is available on `tilt.Model` instances.

```js
var tilt = require('tilt');

class User extends tilt.Model {
  get attributes() {
    return {
      username: tilt.Sequelize.STRING,
      birthday: tilt.Sequelize.DATE
    };
  }

  get options() {}
}

module.exports = User;
```

Then used like so:

```js
create(req, res, next) {
  var user = new User({
    username: 'foobar',
    birthday: new Date()
  }, this.db);

  user.save()
    .catch(next)
    .then(() => {
      res.end('User saved');
    });
}
```

## API
- [Tilt](#tilt)
  - [HTTP server](#tilt-http-server)
  - [HTTP server with module based architecture](#tilt-http-server-with-module-based-architecture)
- [Assets](#assets)
  - [HTTP /assets/](#assets-http-assets)
- [tilt.Model](#tiltmodel)


<a name="tilt"></a>
### Tilt
<a name="tilt-http-server"></a>
#### HTTP server
Renders 404 html.

```js
request(this.app.server)
  .get('/blah')
  .expect('Content-Type', 'text/html')
  .expect(404)
  .end(done);
```

Renders homepage.

```js
request(this.app.server)
  .get('/')
  .expect('Content-Type', 'text/html')
  .expect(/Bonjour Title/)
  .end(done);
```

Renders /home.

```js
request(this.app.server)
  .get('/home')
  .expect(/Response from/)
  .end(done);
```

<a name="tilt-http-server-with-module-based-architecture"></a>
#### HTTP server with module based architecture
Renders 404 html.

```js
request(this.app.server)
  .get('/blah')
  .expect('Content-Type', 'text/html')
  .expect(404)
  .end(done);
```

Renders homepage.

```js
request(this.app.server)
  .get('/')
  .expect('Content-Type', 'text/html')
  .expect(/Hello Bob/)
  .end(done);
```

Renders /profile.

```js
request(this.app.server)
  .get('/profile')
  .expect(/Response from profile module/)
  .end(done);
```

Renders /profile/template.

```js
request(this.app.server)
  .get('/profile/template')
  .expect(/Response from profile module using a React view/)
  .end(done);
```

<a name="assets"></a>
### Assets
<a name="assets-http-assets"></a>
#### HTTP /assets/
Renders /assets/main.js.

```js
request(this.app.server)
  .get('/assets/main.js')
  .expect('Content-Type', 'application/javascript')
  .expect(/classCallCheck/)
  .expect(/return App/)
  .end(done);
```

Renders /assets/main.css.

```js
request(this.app.server)
  .get('/assets/main.css')
  .expect('Content-Type', 'text/css')
  .expect(/display: flex/)
  .expect(/display: -webkit-box/)
  .end(done);
```

<a name="tiltmodel"></a>
### tilt.Model
Defines a sequelize instance.

```js
var User = class extends tilt.Model {
  get attributes() {
    return {
      username: tilt.Sequelize.STRING,
      birthday: tilt.Sequelize.DATE
    };
  }
  get options() {}
}
var user = new User({
  username: 'John Doe',
  birthday: new Date()
}, this.app.db);
assert.ok(user.sequelize);
// Sequelize API
assert.equal(typeof user.find, 'function');
assert.equal(typeof user.findById, 'function');
``
