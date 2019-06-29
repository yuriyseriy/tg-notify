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
  const activationCode = speakeasy.generateSecret().hex;

  const user = await User.create({
    email,
    password
  });

  ctx.body = {
    token: user.jwtToken()
  };
});

router.get('/test', ctx => {
  // speakeasy.generateSecret()
  ctx.body = speakeasy.generateSecret();
});

router.post('/auth/forgot', stub);

module.exports = router;