'use strict';

const Model = require('../../lib/model');
const pm2 = require('../../lib/pm2');

exports.work = function* (node) {
  const info = yield pm2.getInfo(node.ip);
  const data = info.byPort(node.port).monit;
  yield Model.Info.create({
    node: node.name,
    memory: data.memory,
    cpu: data.cpu
  });
};

