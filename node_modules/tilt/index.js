var path = require('path');
var glob = require('glob');

const dirs = [path.join(__dirname, 'lib'), path.join(__dirname, 'examples')];
require('babel-register')({
  presets: ['es2015'],
  // plugins: ['babel-plugin-transform-decorators-legacy', 'add-module-exports'],
  plugins: ['add-module-exports'],

  only: function(filename) {
    var ok = !!dirs.find((dir) => {
      return filename.indexOf(dir) === 0;
    });

    return ok;
  }
});


var Tilt = require('./lib/tilt');

module.exports = tilt;
tilt.Tilt = Tilt;
tilt.Controller = require('./lib/router');
tilt.Model = require('./lib/model');
tilt.Sequelize = require('sequelize');

function tilt() {
  return new Tilt();
}
