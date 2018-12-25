const Router = require('koa-router');

const router = new Router();

const stub = ctx => ctx.body = 'stub';

/**
 * api_key - user api key
 * bot - bot name
 * message
 */
router.post('/api/bots/:id/send', stub);

/**
 * api_key - user api key
 * bot - bot name
 * limit - 20|100
 * offset - 0
 */
router.get('/api/bots/:id/subcribers', stub);

router.get('/api/bots', stub);

module.exports = router;