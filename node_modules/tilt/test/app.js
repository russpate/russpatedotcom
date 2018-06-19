var tilt    = require('..');
var assert  = require('assert');
var request = require('supertest');

describe('Tilt', () => {

  describe('HTTP server', () => {
    before((done) => {
      var app = this.app = tilt();

      app
        .controllers('examples/vertical/app/controllers/*')
        .views('examples/vertical/app/views/')
        .init()
        .then(done.bind(null, null));
    });

    it('Renders 404 html', (done) => {
      request(this.app.server)
        .get('/blah')
        .expect('Content-Type', 'text/html')
        .expect(404)
        .end(done);
    });

    it('Renders homepage', (done) => {
      request(this.app.server)
        .get('/')
        .expect('Content-Type', 'text/html')
        .expect(/Bonjour Title/)
        .end(done);
    });

    it('Renders /home', (done) => {
      request(this.app.server)
        .get('/home')
        .expect(/Response from/)
        .end(done);
    });
  });

  describe('HTTP server with module based architecture', () => {
    before((done) => {
      var app = this.app = tilt();

      app
        .controllers('examples/horizontal/app/*/controllers/*')
        .views('examples/horizontal/app/*/views/')
        .init()
        .then(done.bind(null, null));
    });

    it('Renders 404 html', (done) => {
      request(this.app.server)
        .get('/blah')
        .expect('Content-Type', 'text/html')
        .expect(404)
        .end(done);
    });

    it('Renders homepage', (done) => {
      request(this.app.server)
        .get('/')
        .expect('Content-Type', 'text/html')
        .expect(/Hello Bob/)
        .end(done);
    });

    it('Renders /profile', (done) => {
      request(this.app.server)
        .get('/profile')
        .expect(/Response from profile module/)
        .end(done);
    });

    it('Renders /profile/template', (done) => {
      request(this.app.server)
        .get('/profile/template')
        .expect(/Response from profile module using a React view/)
        .end(done);
    });
  });

});
