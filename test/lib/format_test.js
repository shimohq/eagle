'use strict';

const format = require('../../lib/format');

describe('format', function () {

  describe('#seconds', function () {

    it('should convert seconds to seconds', function () {
      expect(format.seconds(40)).to.equal('40 s');
    });

    it('should convert seconds to minutes', function () {
      expect(format.seconds(73)).to.equal('1 m');
    });

    it('should convert seconds to hours', function () {
      expect(format.seconds(4000)).to.equal('1 h');
    });

    it('should convert seconds to days', function () {
      expect(format.seconds(3600 * 25)).to.equal('1 d');
    });

  });

  describe('#bytes', function () {

    it('should convert bytes to bytes', function () {
      expect(format.bytes(1000)).to.equal('1000 B');
    });

    it('should convert bytes to kb', function () {
      expect(format.bytes(1024 * 1.46)).to.equal('1.46 K');
    });

    it('should convert bytes to mb', function () {
      expect(format.bytes(1024 * 1024 * 1.46)).to.equal('1.46 M');
    });

    it('should convert bytes to gb', function () {
      expect(format.bytes(1024 * 1024 * 1024 * 1.46)).to.equal('1.46 G');
    });

  });

});
