'use strict';

const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const path = require('path');
const ping = require('./lib/ping');
const config = require('config');

router
  .get('/', function* () {
    this.render('index');
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
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
