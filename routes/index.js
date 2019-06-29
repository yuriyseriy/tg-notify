const Router = require('koa-router');

const router = new Router();

router.get('/', async ctx => {
  ctx.body = ['test'];
});


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

router.post('/webHook/:id');

module.exports = router;