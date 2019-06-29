const Router = require('koa-router');

const router = new Router({
  prefix: '/api'
});

// todo api нужен для подключения с других мест

const stub = ctx => ctx.body = 'stub';

/**
 * api_key - user api key
 * bot - bot name
 * message
 */
router.post('/bots/:id/send', stub);

/**
 * api_key - user api key
 * bot - bot name
 * limit - 20|100
 * offset - 0
 */
router.get('/bots/:id/subcribers', stub);

router.get('/bots', stub);

module.exports = router;