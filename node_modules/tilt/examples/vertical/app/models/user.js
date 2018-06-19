
import tilt from '../../../..';

// Figuring out the API
export default class User extends tilt.Model {
  get attributes() {
    return {
      username: tilt.Sequelize.STRING,
      birthday: tilt.Sequelize.DATE
    };
  }

  get options() {}
}
