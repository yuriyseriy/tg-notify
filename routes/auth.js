const Router = require('koa-router');
const speakeasy = require('speakeasy');
const {User} = require('../models');

const router = new Router({
  prefix: '/auth'
});

const stub = ctx => ctx.body = 'stub';

router.post('/login', ctx => {
  const {user} = ctx.state;

  ctx.body = {
    email: user.email,
    token: user.jwtToken()
  };
});

router.post('/signup', async ctx => {
  const {email, password} = ctx.request.body;
  const {base32, hex} = speakeasy.generateSecret();

  const user = await User.create({
    email,
    password,
    activationCode: hex,
    apiKey: base32
  });

  ctx.body = {
    token: user.jwtToken()
  };
});

router.post('/auth/forgot', stub);

module.exports = router;