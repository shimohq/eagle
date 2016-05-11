'use strict';
const logger = require('../lib/logger');

function* routeLog(next) {
  logger.info(this.method + ' ' + this.url);
  yield next;
}

module.exports = routeLog;
