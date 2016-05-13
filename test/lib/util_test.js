'use strict';

const util = require('../../lib/util');

describe('util', function () {

  describe('#nodes', function () {
    const nodes = util.nodes();
    expect(nodes.length).to.equal(2);
    expect(nodes[0].ip).to.equal('localhost');
  });
});
