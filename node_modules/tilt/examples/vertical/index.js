var path = require('path');
var tilt = require('../..');

var app = tilt();

app
  // Setting up controllers glob, default: app/controllers/*
  .controllers(path.join(__dirname, 'app/controllers/*'))

  // Views
  .views(path.join(__dirname, 'app/views/'))

  // Static / public directories (pattern must end with a "/")
  .static(path.join(__dirname, 'app/public/'))

  // Assets directories
  .assets(path.join(__dirname, 'app/assets/'))

  // Custom middlewares
  .use(require('morgan')('dev'));

// Start the server
app.start(function(err) {
  if (err) throw err;
  console.log('Server started');
});
