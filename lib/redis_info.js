'use strict';

const Redis = require('ioredis');
const _ = require('lodash');
const util = require('./util');

class RedisInfo {

  constructor(node) {
    this.node = node;
  }

  *getInfo() {
    const options = _.pick(this.node, ['host', 'port', 'password']);
    const redis = new Redis(options);

    const info = yield redis.info();
    redis.disconnect();

    const memory = (/used_memory_rss:(.+)/).exec(info)[1];
    let uptime = (/uptime_in_seconds:(.+)/).exec(info)[1];
    const clients = (/connected_clients:(.+)/).exec(info)[1];
    let input = (/instantaneous_input_kbps:(.+)/).exec(info)[1];
    let output = (/instantaneous_output_kbps:(.+)/).exec(info)[1];
    let ops = (/instantaneous_ops_per_sec:(.+)/).exec(info)[1];

    uptime = util.secondsFormat(uptime);
    input = input / 8 + ' KB/s';
    output = output / 8 + ' KB/s';
    ops += ' operations/s';
    return { memory, uptime, clients, input, output, ops };
  }
}

module.exports = RedisInfo;
