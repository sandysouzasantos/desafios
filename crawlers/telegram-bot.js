const TelegramBot = require(`node-telegram-bot-api`);
const htmlparser2 = require('htmlparser2');
const request = require('superagent');
const cheerio = require('cheerio');

const token = ``;
const redditUrl = 'https://old.reddit.com';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});

/*
bot.on('text', (msg) => {
    if (msg.text.toLowerCase().indexOf('/nadaprafazer') === 0) {
        const chatId = msg.chat.id;
        const subredditString = msg.slice(msg.indexOf(' '));
        const subredditsArray = subredditString.split(';');
        const response = 'oi';

        //Aqui vai o código

        bot.sendMessage(chatId, resp);
    }
});*/
