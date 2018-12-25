const Router = require('koa-router');

const router = new Router();

const stub = ctx => ctx.body = 'stub';

router.post('/auth/login', ctx => {
    const {user} = ctx.state;

    ctx.body = {
        email: user.email,
        token: user.generateJwt()
    };
});

router.post('/auth/signup', async ctx => {
    const user = new User(ctx.request.body);

    try {
        await user.save();

        ctx.body = {
            token: user.generateJwt()
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
});

router.post('/auth/forgot', stub);

module.exports = router;