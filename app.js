const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN || '';
const URL = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443';

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${URL}/bot${TOKEN}`);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const sendMessage = text => {
    const chats = [
        673834051
    ];

    for (let i in chats) {
        bot.sendMessage(chats[i], text);
    }
};

app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.post('/notify', (req, res) => {
    sendMessage(req.body.text);

    // todo save request

    res.json({success: true});
});

app.get('/test', (req, res) => {
    sendMessage('Hello from text');

    res.json({success: true});
});

app.get('/xpub/:xpub', (req, res) => {
    axios(`https://blockchain.info/multiaddr?active=${req.params.xpub}`).then(result => {
        const balance = result.data.wallet.final_balance/100000000;

        sendMessage(`New wallet: ${balance} BTC`);
    }).catch(err => {
        console.log(err.data)
    });

    res.json({success: true});
});

app.listen(PORT, () => {
    console.log(`Express server is listening on ${PORT}`);
});

bot.on('message', msg => {
    const {text} = msg;

    // todo save to db

    if (text === '/start') {
        bot.sendMessage(msg.chat.id, 'Hello, please ether password:');
    } else if (text === 'qwe@123') {
        bot.sendMessage(msg.chat.id, 'Congratulations, password is correct. Get Luchy :)');
    } else {
        bot.sendMessage(msg.chat.id, 'Sorry, your ID: ' + msg.chat.id);
    }
});