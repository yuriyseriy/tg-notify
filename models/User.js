'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Sequelize, Model} = require('sequelize');

const {JWT_SECRET_PHRASE} = process.env;

class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  hashPassword() {
    return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  jwtToken() {
    const payload = {
      id: this.id,
      expires: Date.now() + 3 * 60 * 60 * 1000,
    };

    return jwt.sign(JSON.stringify(payload), JWT_SECRET_PHRASE);
  }
}

module.exports =

  sequelize => User.init({
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 8,
          msg: "Pizda bratik"
        }
      }
    },
    activationCode: Sequelize.STRING,
    passwordResetCode: Sequelize.STRING,
    apiKey: Sequelize.STRING
  }, {
    sequelize,
    tableName: 'users',
    hooks: {
      beforeCreate: (user, options) => {
        return bcrypt.hash(user.password, bcrypt.genSaltSync(8)).then(password => {
          user.password = password;
        });
      }
    }
  });