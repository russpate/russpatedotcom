var Controller = require('../../../../..').Controller;

class ProfileController extends Controller {
  get routes() {
    return {
      '/profile': 'index',
      '/profile/template': 'template'
    };
  }

  index(req, res) {
    return res.end('Response from profile module!');
  }

  template(req, res) {
    return res.render('profile', { title: 'Response from profile module using a React view' });
  }
}


module.exports = ProfileController;
