'use strict';

exports.seconds = function (seconds) {
  let time = +seconds;
  if (time < 60) {
    return time + ' s';
  }

  time /= 60;
  if (time <= 60) {
    return Math.floor(time) + ' m';
  }

  time /= 60;
  if (time <= 24) {
    return Math.floor(time) + ' h';
  }

  time /= 24;
  return Math.floor(time) + ' d';
};

exports.bytes = function (bytes) {
  let size = bytes;
  if (size < 1024) {
    return size + ' B';
  }

  size /= 1024;
  if (size < 1024) {
    return size.toFixed(2) + ' K';
  }

  size /= 1024;
  if (size < 1024) {
    return size.toFixed(2) + ' M';
  }

  size /= 1024;
  return size.toFixed(2) + ' G';
};

