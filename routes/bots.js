const Router = require('koa-router');
const Telegraf = require('telegraf');
const {Bot, Subscriber} = require('./models');

const {URL} = process.env;

const router = new Router({
  prefix: '/bots'
});

const stub = ctx => ctx.body = 'stub';

router.get('/', jwt, async ctx => {
  const {user} = ctx.state;

  ctx.body = await Bot.findAll({
    where: {
      userId: user.id
    }
  });
});

router.post('/:id/update', stub);
router.post('/create', stub);
// block subscribers

router.get('/:id', jwt, async ctx => {
  const {user} = ctx.state;
  const {id} = ctx.params;

  const bot = await Bot.findOne({
    where: {
      userId: user.id,
      id
    }
  });

  if (bot) {
    ctx.body = bot;
  } else {
    ctx.throw(404, 'Bot not found');
  }
});

router.get('/:id/statistic', stub);

router.get('/:id/subscribers', async ctx => {
  const {user} = ctx.state;
  const {id} = ctx.params;

  const bot = await Bot.findOne({
    where: {
      userId: user.id,
      id
    }
  });

  if (bot) {
    ctx.body = await Subscriber.findAll({
      where: {
        botId: bot.id
      }
    })
  } else {
    ctx.throw(404, 'Bot not found');
  }
});

router.post('/:id/setWebHook', jwt, async ctx => {
  const {user} = ctx.state;
  const {id} = ctx.params;

  const bot = await Bot.findOne({
    where: {
      userId: user.id,
      id
    }
  });

  const telegraf = new Telegraf(bot.token);
  telegraf.telegram.setWebhook(`${URL}/bots/${bot.id}/webHook/${bot.token}`);

  ctx.body = {
    success: true
  };
});

router.post('/:id/webHook/:token', async ctx => {
  // const telegraf = new Telegraf(bot.token);
  // bot.handleUpdate(ctx.request.body, ctx.response);

  ctx.status = 200;
  console.log(ctx.request.body);

});

module.exports = router;