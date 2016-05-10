'use strict';

const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const ping = require('./lib/ping');
const logger = require('./lib/logger');
const config = require('config');

router
  .get('/', function* () {
    this.body = config;
  })
  .get('/ping/:name', function* () {
    const name = this.params.name;
    const options = config[name];
    const type = name.split('-')[0];

    this.body = yield ping[type](options);
  });

function* routeLog(next) {
  logger.info(this.method + ' ' + this.url);
  yield next;
}

app
  .use(routeLog)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
