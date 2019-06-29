'use strict';

const {Sequelize, Model} = require('sequelize');

class Subscriber extends Model {
}

module.exports = sequelize => Subscriber.init({
  botId: Sequelize.INTEGER,
  chatId: Sequelize.INTEGER,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  nickname: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN
}, {
  sequelize,
  tableName: 'subscribers'
});