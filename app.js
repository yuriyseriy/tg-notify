const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const errorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');
const api = require('./routes/api');
const auth = require('./routes/auth');
const bots = require('./routes/bots');
const system = require('./routes/system');

const {PORT} = process.env;

const app = new Koa();

app.use(errorHandler);
app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());
app.use(api.routes()).use(api.allowedMethods());
app.use(auth.routes()).use(auth.allowedMethods());
app.use(bots.routes()).use(bots.allowedMethods());
app.use(system.routes()).use(system.allowedMethods());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/**
 * Получение сообщений из Телеграм
 * 1. пользователь создает телеграм бот и получает API TOKEN
 * 2. пользователь вводит API TOKEN при добавлении bot
 * 3. генерация url: https://notify.com/webhook/1234567
 * 4. установка setWebhook с url
 * отдельная кнопка setWebhook
 * 5. когда пользователь отправляет сообщение, то оно приходит на /webhook/:id
 * 6. ищем в базе id, если находим то инициализируем new Telegram(bot.token)
 * 7. читаем text, если это /start, то заносим в БД нового подписчика
 * !8. в будующем сделать раздел Автоответы
 * 9. отправить webhook, если он установлен
 */

/**
 * Отправка сообщений в Телеграм
 * 1. с помощью Middleware определить пользователя по api_key
 * 2. найти bot с id
 * 3. получить список подписчиков(isBlocked = false) и по циклу отправить всем письмо
 */

/**
 * todo сделать группы и персоны
 * отправить в группу(где много людей)
 * отправить 1 человеку
 */