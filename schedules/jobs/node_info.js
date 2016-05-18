'use strict';

const { Info } = require('../../lib/model');
const pm2 = require('../../lib/pm2');
const RedisInfo = require('../../lib/redis_info');
const ping = require('../../lib/ping');

exports.work = function* (node) {
  const result = { node: node.name };
  if (/^http-/.test(node.name)) {
    const info = yield pm2.getInfo(node.ip);
    const data = info.byPort(node.port).monit;
    result.memory = data.memory;
    result.cpu = data.cpu;
  } else if (/^redis-/.test(node.name)) {
    const redisInfo = new RedisInfo(node);
    const info = yield redisInfo.getInfo(node.ip);
    result.memory = info.memory;
    delete info.memory;
    result.extra = JSON.stringify(info);
  }
  const type = node.name.split('-')[0];
  result.delay = yield ping[type](node);
  yield Info.create(result);
};

