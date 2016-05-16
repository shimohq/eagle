'use strict';

const { Info } = require('../../lib/model');
const pm2 = require('../../lib/pm2');
const ping = require('../../lib/ping');

exports.work = function* (node) {
  const result = { node: node.name };
  if (/^http-/.test(node.name)) {
    const info = yield pm2.getInfo(node.ip);
    const data = info.byPort(node.port).monit;
    result.memory = data.memory;
    result.cpu = data.cpu;
  }
  const type = node.name.split('-')[0];
  result.delay = yield ping[type](node);
  yield Info.create(result);
};

