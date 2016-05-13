'use strict';

const Model = require('../../lib/model');
const sequelize = Model.sequelize;
const Info = Model.Info;

describe('Info', function () {
  beforeEach(function* () {
    yield sequelize.sync({ force: true });
  });

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
