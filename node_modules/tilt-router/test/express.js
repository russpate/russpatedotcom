'use strict';

const http    = require('http');
const Router  = require('..');
const assert  = require('assert');
const request = require('supertest');

const PORT = process.env.PORT || 0;

describe('Express', () => {

  it('Router.dispatch() - express middleware', (done) => {
    var app = require('express')();
    var middleware = Router.middleware(app);

    var req = { url: '/' };
    var res = {};

    middleware(req, res, (err) => {
      assert.equal(err.message, 'No route found');
      done();
    });
  });

  describe('HTTP response', () => {
    class App extends Router {
      get routes() {
        return {
          '/': 'index'
        };
      }

      index(req, res, next) {
        return res.end('OK');
      }
    }

    beforeEach(() => {
      var app = require('express')();
      this.app = new App(app);
    });

    it('GET /', (done) => {
      request(this.app.app)
        .get('/')
        .expect('OK')
        .expect(200, done);
    });

    it('404', (done) => {
      request(this.app.app)
        .get('/aoizheuaziouh')
        .expect(404, done);
    });
  });


});
