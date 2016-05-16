'use strict';

const CronJob = require('cron').CronJob;
const NodeInfo = require('./jobs/node_info');
const util = require('../lib/util');
const co = require('co');
const logger = require('../lib/logger');

exports.start = function () {
  const nodes = util.nodes();
  new CronJob('*/5 * * * * *', function () {
    logger.info('job is running.');
    co(function* () {
      for (const node of nodes) {
        yield NodeInfo.work(node);
      }
    }).catch(function (err) {
      logger.error(err);
    });
  }).start();
};
