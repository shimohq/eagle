'use strict';

const pug = require('pug');
const path = require('path');

module.exports = function (viewDir) {
  return function* (next) {
    if (!this.render) {
      this.render = function (filename, locals) {
        filename = path.join(viewDir, filename + '.jade');
        this.body = pug.renderFile(filename, locals || this.state || {});
      };
    }
    yield next;
  };
};
