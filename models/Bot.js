'use strict';

const {Sequelize, Model} = require('sequelize');

class Bot extends Model {
}

module.exports = sequelize => Bot.init({
  userId: Sequelize.INTEGER,
  botId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  webHookUrl: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING
}, {
  sequelize,
  tableName: 'bots'
});