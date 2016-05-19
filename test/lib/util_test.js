'use strict';

const util = require('../../lib/util');

describe('util', function () {

  describe('#nodes', function () {

    it('should get all nodes config', function () {
      const nodes = util.nodes();
      expect(nodes.length).to.equal(3);
      expect(nodes[0].ip).to.equal('localhost');
    });

    it('should get specific type nodes config', function () {
      const nodes = util.nodes('http');
      expect(nodes.length).to.equal(2);
      expect(nodes[0].ip).to.equal('localhost');
    });
  });

});
