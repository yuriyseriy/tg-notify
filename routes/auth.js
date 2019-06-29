const Router = require('koa-router');

const router = new Router({
  prefix: '/auth'
});

const stub = ctx => ctx.body = 'stub';

router.post('/login', ctx => {
  const {user} = ctx.state;

  ctx.body = {
    email: user.email,
    token: user.generateJwt()
  };
});

router.post('/signup', async ctx => {
  const {email, password} = ctx.request.body;


  try {
    const user = await User.create({
      email,
      password
    });

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