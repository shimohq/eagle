'use strict';

const NodeInfo = require('../../../schedules/jobs/node_info');
const Model = require('../../../lib/model');
const sequelize = Model.sequelize;
const Info = Model.Info;
const ping = require('../../../lib/ping');
const pm2 = require('../../../lib/pm2');

describe('NodeInfoSchedule', function () {
  const monit = {
    cpu: 3,
    memory: 1024000
  };
  const delay = 56;

  beforeEach(function* () {
    yield sequelize.sync({ force: true });

    // mock the pm2
    pm2.getInfo = function () {
      return Promise.resolve({
        byPort: function () {
          return { monit };
        }
      });
    };

    // mock the ping
    ping.http = function () {
      return Promise.resolve(delay);
    };
    ping.mysql = function () {
      return Promise.resolve(delay);
    };
    ping.redis = function () {
      return Promise.resolve(delay);
    };
  });

  context('http node', function () {

    it('should fetch and save http info', function* () {
      const node = {
        name: 'http-web-9001',
        ip: 'localhost',
        port: 9001
      };

      yield NodeInfo.work(node);

      const infos = yield Info.findAll();
      expect(infos.length).to.equal(1);

      const info = infos[0];
      expect(info.node).to.equal(node.name);
      expect(info.cpu).to.equal(monit.cpu);
      expect(info.memory).to.equal(monit.memory);
      expect(info.delay).to.equal(delay);
    });
  });

  context('mysql node', function () {

    it('should fetch and save mysql node info', function* () {
      const node = {
        name: 'mysql-master',
        ip: 'localhost'
      };

      yield NodeInfo.work(node);

      const infos = yield Info.findAll();
      expect(infos.length).to.equal(1);

      const info = infos[0];
      expect(info.node).to.equal(node.name);
      expect(info.cpu).to.be.null;
      expect(info.memory).to.be.null;
      expect(info.delay).to.equal(delay);
    });
  });

  context('redis node', function () {

    it('should fetch and save redis node info', function* () {
      const node = {
        name: 'redis-master',
        ip: 'localhost',
        port: 6379
      };

      yield NodeInfo.work(node);

      const infos = yield Info.findAll();
      expect(infos.length).to.equal(1);

      const info = infos[0];
      expect(info.node).to.equal(node.name);
      expect(info.cpu).to.be.null;
      expect(info.memory).to.be.null;
      expect(info.delay).to.equal(delay);
    });
  });
});
