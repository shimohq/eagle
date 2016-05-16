'use strict';

const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const path = require('path');
const config = require('config');
const serve = require('koa-static');
const mount = require('koa-mount');
const util = require('./lib/util');
const { Info } = require('./lib/model');

require('./schedules/').start();

router
  .get('/', function* () {
    const host = process.env.HOST;
    this.render('index', { host });
  })
  .get('/api/nodes', function* () {
    this.body = util.nodes();
  })
  .get('/api/pull/:name', function* () {
    const name = this.params.name;
    const info = yield Info.findOne({
      where: {
        node: name
      },
      order: 'id DESC'
    });
    this.body = info;
  });

app
  .use(require('./middlewires/request_log'))
  .use(require('./middlewires/jade')(path.join(__dirname, 'views')))
  .use(mount('/static', serve(path.join(__dirname, 'public'))))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port);
