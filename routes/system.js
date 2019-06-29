const Router = require('koa-router');
const {Bot, Subscriber, User} = require('../models');

const router = new Router({
  prefix: '/system'
});

router.get('/bots', async ctx => ctx.body = await Bot.findAll());
router.get('/subscribers', async ctx => ctx.body = await Subscriber.findAll());
router.get('/users', async ctx => ctx.body = await User.findAll());

module.exports = router;
