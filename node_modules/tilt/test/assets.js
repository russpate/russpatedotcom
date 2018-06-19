var tilt    = require('..');
var assert  = require('assert');
var request = require('supertest');

describe('Assets', () => {
  describe('HTTP /assets/', () => {
    before((done) => {
      var app = this.app = tilt();

      app
        .controllers('examples/vertical/app/controllers/*')
        .views('examples/vertical/app/views/')
        .assets('examples/vertical/app/assets/')
        .init()
        .then(done.bind(null, null));
    });

    it('Renders /assets/main.js', (done) => {
      request(this.app.server)
        .get('/assets/main.js')
        .expect('Content-Type', 'application/javascript')
        .expect(/classCallCheck/)
        .expect(/return App/)
        .end(done);
    });

    it('Renders /assets/main.css', (done) => {
      request(this.app.server)
        .get('/assets/main.css')
        // .expect('Content-Type', 'text/css')
        .expect(/display:flex/)
        .expect(/display:-webkit-box/)
        .end(done);
    });
  });
});
