'use strict';

const request = require('request');
const logger = require('./logger');
const Redis = require('ioredis');
const mysql = require('mysql');

const errorDelay = 1000 * 30;

exports.errorDelay = errorDelay;

exports.http = function (options) {
  return new Promise(function (resolve, reject) {
    const url = `http://${options.ip}:${options.port}${options.path}`;
    request(url, { timeout: errorDelay }, function (err, response) {
      if (err) {
        reject(err);
      } else if (response.statusCode !== 200) {
        reject(new Error(`status code: ${response.statusCode}`));
      } else {
        resolve();
      }
    });
  });
};

function retryStrategy() {}

exports.redis = function* (options) {
  options.retryStrategy = retryStrategy;
  const redis = new Redis(options);
  yield redis.ping();
};

exports.mysql = function (options) {
  return new Promise(function (resolve, reject) {
    const conn = mysql.createConnection(options);
    conn.connect();

    conn.query('select 1 from dual', function (err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });

    conn.end();
  });
};

function profile(func) {
  return function*(options) {
    try {
      const t1 = +new Date();
      yield func(options);
      const t2 = +new Date();
      return t2 - t1;
    } catch (err) {
      logger.error(err);
      return errorDelay;
    }
  };
}

for (const key in exports) {
  const item = exports[key];
  if (typeof item === 'function') {
    exports[key] = profile(item);
  }
}
