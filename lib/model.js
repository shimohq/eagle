'use strict';

const Sequelize = require('sequelize');
const config = require('config');
const logger = require('./logger');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect || 'mysql',
  port: config.db.port || 3306,
  pool: {
    max: 5,
    min: 1,
    idle: 10000
  },
  logging: function (str) {
    logger.debug(str);
  }
});

const Info = sequelize.define('info', {
  node: Sequelize.STRING,
  memory: Sequelize.INTEGER,
  cpu: Sequelize.INTEGER,
  delay: Sequelize.INTEGER
});

// 如果是直接在控制台运行 node model.js，则创建表
if (!module.parent) {
  sequelize
    .sync({ force: true })
    .then(() =>{
      console.log('sync finished.');
      process.exit();
    });
}

exports.sequelize = sequelize;
exports.Info = Info;
