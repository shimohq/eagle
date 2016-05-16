'use strict';

const { sequelize, Info } = require('../../lib/model');

describe('Info', function () {

  beforeEach(function* () {
    yield sequelize.sync({ force: true });
  });

  describe('Info', function () {

    it('should save info', function* () {
      let info = yield Info.create({
        node: 'mysql-master',
        cpu: 3,
        memory: 1024000
      });
      expect(info.id).to.be.ok;

      info = yield Info.findById(info.id);
      expect(info.node).to.equal('mysql-master');
    });

  });

});
