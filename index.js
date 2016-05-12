'use strict';

const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const path = require('path');
const ping = require('./lib/ping');
const config = require('config');
const serve = require('koa-static');
const mount = require('koa-mount');

router
  .get('/', function* () {
    const host = process.env.HOST;
    this.render('index', { host });
  })
  .get('/config', function* () {
    this.body = config;
  })
  .get('/ping/:name', function* () {
    const name = this.params.name;
    const options = config[name];
    const type = name.split('-')[0];

    this.body = yield ping[type](options);
  });

app
  .use(require('./middlewires/request_log'))
  .use(require('./middlewires/jade')(path.join(__dirname, 'views')))
  .use(mount('/static', serve(path.join(__dirname, 'public'))))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port);
