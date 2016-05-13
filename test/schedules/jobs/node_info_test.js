'use strict';

const NodeInfo = require('../../../schedules/jobs/node_info');
const Model = require('../../../lib/model');
const sequelize = Model.sequelize;
const Info = Model.Info;

describe('NodeInfoSchedule', function () {
  const node = {
    name: 'http-web-9001',
    ip: 'localhost',
    port: 9001
  };

  it('should fetch and save info', function* () {
    yield sequelize.sync({ force: true });

    // mock the pm2
    const pm2 = require('../../../lib/pm2');
    const monit = {
      cpu: 3,
      memory: 1024000
    };
    pm2.getInfo = function () {
      return Promise.resolve({
        byPort: function () {
          return { monit };
        }
      });
    };

    yield NodeInfo.work(node);

    const infos = yield Info.findAll();
    expect(infos.length).to.equal(1);

    const info = infos[0];
    expect(info.node).to.equal(node.name);
    expect(info.cpu).to.equal(monit.cpu);
    expect(info.memory).to.equal(monit.memory);
  });
});
