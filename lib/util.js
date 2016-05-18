'use strict';

const config = require('config');
const _ = require('lodash');

const regex = new RegExp(config.nodeTest);

exports.nodes = function (type) {
  const nodes = [];
  _.each(config, (item, key) => {
    if (regex.test(key) && (!type || key.indexOf(type) === 0)) {
      item.name = key;
      nodes.push(item);
    }
  });
  return nodes;
};

exports.secondsFormat = function (seconds) {
  let time = +seconds;
  if (time < 60) {
    return time + 's';
  }

  time /= 60;
  if (time <= 60) {
    return Math.floor(time) + 'm';
  }

  time /= 60;
  if (time <= 60) {
    return Math.floor(time) + 'h';
  }

  time /= 24;
  return Math.floor(time) + 'd';
};

