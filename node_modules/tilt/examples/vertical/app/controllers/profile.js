
var Controller = require('../../../..').Controller;

class Home extends Controller {
  get routes() {
    return {
      '/home': 'index'
    };
  }

  index(req, res) {
    return res.end('Response from home!');
  }
}


module.exports = Home;
