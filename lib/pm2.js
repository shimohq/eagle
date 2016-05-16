// 启动 pm2 web 后，pm2 会开放 api 在 9615 端口。
// pm2 的 api 会提供有关运行在 pm2 中的进程的相信信息。
// 这个脚本就是要筛选掉大部分暂时无用的信息，保留有用的信息。

'use strict';

const request = require('request');
const _ = require('lodash');

class Info {

  constructor(data) {
    this.data = data;
  }

  byPort(port) {
    return _.find(this.processes, (item) => {
      return +item.pm2_env.PORT === +port;
    });
  }

  get processes() {
    return this.data.processes;
  }
}

function getInfo(host) {
  return new Promise((resolve, reject) => {
    if (!host) {
      reject(new Error('You should specify a host!'));
    }
    request(`http://${host}:9615`, (err, response, data) => {
      if (err) {
        reject(err);
      } else {
        const info = new Info(JSON.parse(data));
        resolve(info);
      }
    });
  });
}

exports.getInfo = getInfo;
