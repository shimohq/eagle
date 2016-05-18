'use strict';

const expect = require('chai').expect;
const RedisInfo = require('../../lib/redis_info');

describe('RedisInfo', function () {
  let info;

  before(function* () {
    const ri = new RedisInfo('localhost');
    info = yield ri.getInfo();
  });

  it('should know redis uptime', function* () {
    expect(info).to.have.property('uptime');
  });

  it('should know redis memory', function* () {
    expect(info).to.have.property('memory');
  });

  it('should know redis connected clients', function* () {
    expect(info).to.have.property('clients');
  });

  it('should know redis io', function* () {
    expect(info).to.have.property('input');
    expect(info).to.have.property('output');
  });

  it('should know redis ops per sec', function* () {
    expect(info).to.have.property('ops');
  });
});
