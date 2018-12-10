const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.APP_URL || '';
const URL = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443';

const app = express();
const bot = new TelegramBot(TOKEN);

app.use(bodyParser.json());

app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.post('/notify', (req, res) => {
    res.json(process.env);
});

app.get('/_env', (req, res) => {
    res.json(process.env);
});

app.listen(PORT, () => {
    console.log(`Express server is listening on ${PORT}`);
});

bot.on('message', msg => {
    const {text} = msg;

    if (text === '/start') {
        bot.sendMessage(msg.chat.id, 'Hello, please ether password:');
    } else if (text === 'qwe@123') {
        bot.sendMessage(msg.chat.id, 'Congratulations, password is correct. Get Luchy :)');
    }
});