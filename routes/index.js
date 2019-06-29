const Router = require('koa-router');

const router = new Router();

router.get('/', async ctx => {
  ctx.body = ['test'];
});

router.post('/webHook/:id');

module.exports = router;