var Sequelize = require('sequelize');
var debug = require('debug')('tilt:model');

var pool = {};

export default class Model {
  constructor(attrs = {}, options = {}) {
    debug('Init model', attrs, options);
    var options = Object.assign({}, this.options, options);

    this.attrs = attrs || {};

    var db = options.db;
    if (db && (!pool[db.name || db.schema])) {
      if (!db.schema) throw new Error('Missing DB schema');
      if (!db.user) throw new Error('Missing DB user');
      this.db = pool[db.name || db.schema] = new Sequelize(db.schema, db.user, db.password || '', db);
    } else {
      debug('Using default connection');
      this.db = pool.default;
    }

    this.name = options.name || this.__proto__.constructor.name;
    this.sequelize = this.db.define(this.name, this.attributes, options);

    // Proxy sequelize methods over our model instance
    Object.keys(this.sequelize.__proto__).forEach((method) => {
      this[method] = this.sequelize[method].bind(this.sequelize);
    });
  }

  save() {
    var sequelizeInstance = this.build(this.attrs);
    return sequelizeInstance.save();
  }

  static pool() {
    return pool;
  }

  static connect(db = {}) {
    if (!db.schema) throw new Error('Missing DB schema');
    if (!db.user) throw new Error('Missing DB user');
    var connection =  new Sequelize(db.schema, db.user, db.password || '');
    pool.default = connection;
    debug('Create Database conection (schema: %s, user: %s)', db.schema, db.user);
    return Model;
  }

  static sync(name = 'default') {
    var connection = pool[name];
    if (!connection) throw new Error('Unknown connection ' + name);

    var options = { force: process.env.NODE_ENV !== 'production' };
    return connection.sync(options).then(function() {
      debug('DB %s synced', name, options);
    });
  }
}
