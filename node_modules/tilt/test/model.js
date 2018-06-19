
var tilt    = require('..');
var assert  = require('assert');

describe('tilt.Model', () => {

  it('Defines a sequelize instance', () => {
    var User = class extends tilt.Model {
      get attributes() {
        return {
          username: tilt.Sequelize.STRING,
          birthday: tilt.Sequelize.DATE
        };
      }

      get options() {}
    }

    var user = new User({
      username: 'John Doe',
      birthday: new Date()
    });

    assert.ok(user.sequelize);

    // Sequelize API
    assert.equal(typeof user.find, 'function');
    assert.equal(typeof user.findById, 'function');
  });

});
