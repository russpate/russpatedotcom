'use strict';

const http       = require('http');
const path       = require('path');
const assert     = require('assert');
const request    = require('supertest');
const ViewsReact = require('..');

const PORT = process.env.PORT || 0;

describe('ViewsReact', () => {
  it('res.render()', (done) => {
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
  });
});
