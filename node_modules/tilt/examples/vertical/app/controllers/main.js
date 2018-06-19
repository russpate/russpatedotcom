const debug  = require('debug')('tilt:example:controller:main');

import moment from 'moment';
import User from '../models/user';
import { Inject, Controller } from '../../../..';

class MainController extends Controller {
  get routes() {
    return {
      '/':            'index',
      '/list':        'list',
      '/create':      'create',
      'POST /create': 'createPost',
    };
  }

  index(req, res) {
    return res.render('index', { name: 'Title!' });
  }

  list(req, res) {
    var user = new User();

    user.findAll().then((users) => {
      debug('Users %d', users.length);

      users = users.map(user => {
        var data = user.dataValues;
        data.createdAt = moment(data.createdAt).fromNow();
        data.updatedAt = moment(data.updatedAt).fromNow();
        return data;
      });

      res.render('list', { users });
    });
  }

  create(req, res, next) {
    res.render('create');
  }

  // Will probably have to parse req.body
  createPost(req, res, next) {
    debug('POST create', req.body);

    var user = new User(req.body, this.db);

    user.save()
      .catch(next)
      .then(() => {
        res.redirect('/list');
      });
  }
}

export default MainController;
