const passport = require('koa-passport');
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt');
const {Strategy: LocalStrategy} = require('passport-local');

const {User} = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({where: {email}}).then(user => {
      if (!user) {
        return done(null, false, {
          message: 'Incorrect email'
        });
      }

      if (user.blocked) {
        return done(null, false, {
          message: 'User blocked'
        })
      }

      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password'
        })
      }

      return done(null, user)
    }).catch(error => done(error));
  }
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_PHRASE
  }, (payload, done) => {
    User.findByPk(payload.id)
    .then(user => user ? done(null, user) : done(null, false, 'Error'))
    .catch(err => console.log(err));
  }
));

module.exports = passport;