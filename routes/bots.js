const Router = require('koa-router');
const db = require('../db');

const router = new Router();

const USER_ID = 1;

// todo user middleware
// todo error handler
// todo take out SQL requests to models

const stub = ctx => ctx.body = 'stub';

router.get('/bots', async ctx => {
    ctx.body = await db.from('bots').where({user_id: USER_ID});
});

router.get('/bots/:id', async ctx => {
    const bot = await db.select('id', 'bot_id', 'token', 'created_at').from('bots').where({
        user_id: USER_ID,
        id: ctx.params.id
    }).first();
    if (bot) {
        ctx.body = bot;
    } else {
        ctx.body = {
            error: 'Bot not found'
        };
    }
});

router.get('/bots/:id/statistic', stub);

router.get('/bots/:id/subscribers', async ctx => {
    const bot = await db.select('id', 'bot_id', 'token', 'created_at').from('bots').where({
        user_id: USER_ID,
        id: ctx.params.id
    }).first();
    if (bot) {
        ctx.body = await db.from('subscribers').where({bot_id: bot.id});
    } else {
        ctx.body = {
            error: 'Bot not found'
        };
    }
});

router.post('/bots/:id/update', stub);
router.post('/bots/create', stub);
// block subscribers

module.exports = router;