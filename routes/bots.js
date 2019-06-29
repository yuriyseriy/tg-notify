const Router = require('koa-router');
const Telegraf = require('telegraf');
const jwt = require('../middlewares/jwt');
const {Bot, Subscriber} = require('../models');

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

router.post('/create', jwt, async ctx => {
  const {user} = ctx.state;
  const {name, token, password} = ctx.request.body;

  ctx.body = await await Bot.create({
    userId: user.id,
    name,
    token,
    password
  });
});

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

  /**
   *
   const bot = new Telegraf(TOKEN);
   bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);

   bot.start(({reply}) => reply('Hello, please ether password:'));
   bot.on('message', (ctx) => {
  const {text} = ctx.message;

  if (text === '/start') {
    ctx.telegram.sendMessage(ctx.from.id, 'Hello, please ether password:');
  } else if (text === 'qwe@123') {
    const chat = new Chat();
    chat.chatId = ctx.from.id;
    chat.save();

    ctx.telegram.sendMessage(ctx.from.id, 'Congratulations, your password is correct. Get Lucky :)');
  } else {
    ctx.telegram.sendMessage(ctx.from.id, 'Sorry, but your password incorrect');
  }
});
   */

  ctx.status = 200;
  console.log(ctx.request.body);

});

module.exports = router;