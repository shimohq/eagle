'use strict';

global.expect = require('chai').expect;

require('./lib/pm2_test');
require('./lib/redis_info_test');
require('./lib/model_test');
require('./lib/util_test');
require('./schedules/jobs/node_info_test');
