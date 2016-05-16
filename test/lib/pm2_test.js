'use strict';

const expect = require('chai').expect;
const pm2 = require('../../lib/pm2');

describe('pm2', function () {
  let info;

  before(function* () {
    info = yield pm2.getInfo('localhost');
  });

  it('should raise error when param is undefined', function* () {
    try {
      yield pm2.getInfo();
      expect.fail();
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
    }
  });

  it('should contain processes property', function* () {
    expect(info).to.have.property('processes');
  });

  context('#byPort', function () {
    it('should give info about a port', function* () {
      const prcss = info.byPort(9001);
      expect(prcss).to.have.property('monit');
      expect(prcss.monit).to.have.property('memory');
      expect(prcss.monit).to.have.property('cpu');
    });
  });

});
