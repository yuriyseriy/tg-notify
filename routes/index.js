const Router = require('koa-router');
const db = require('../db');

const router = new Router();

router.get('/', async ctx => {
    ctx.body = await db.select('*').from('users');
});

module.exports = router;