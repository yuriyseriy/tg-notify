const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const routes = require('./routes');
const api = require('./routes/api');
const auth = require('./routes/auth');
const bots = require('./routes/bots');

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());
app.use(api.routes()).use(api.allowedMethods());
app.use(auth.routes()).use(auth.allowedMethods());
app.use(bots.routes()).use(bots.allowedMethods());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));