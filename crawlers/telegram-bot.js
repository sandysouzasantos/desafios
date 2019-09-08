const TelegramBot = require(`node-telegram-bot-api`);
const request = require('superagent');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');

const token = `900183712:AAEyxnb6GX-M-gbenltgSMB0UTzJAPiA1Xg`;
const redditUrl = 'https://old.reddit.com';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/NadaPraFazer/, (msg) => {
    const chatId = msg.chat.id;
    const subredditsString = msg.text.slice(14);
    const wantedSubreddits = subredditsString.split(';');

    if (wantedSubreddits.length > 0 && wantedSubreddits[0] !== '') {
        wantedSubreddits.forEach((subreddit) => {
            const subredditUrl = `${redditUrl}/r/${subreddit.toString()}/`;
            searchPosts(subredditUrl, chatId);
        });
    } else {
        searchPosts(`${redditUrl}/r/all`, chatId);
    }
});

function searchPosts(subredditUrl, chatId) {
    request
        .get(subredditUrl)
        .end((err, response) => {
            if (err) {
                bot.sendMessage(chatId, 'Unable to process your request');
            }

            const dom = htmlparser2.parseDOM(response.text);

            const $ = cheerio.load(dom);

            $('div#siteTable > div.thing').each(function (index) {
                const subredditName = $(this).attr('data-subreddit-prefixed');
                const pontuation = $(this).attr('data-score');
                const title = $(this).find('p.title > a.title').text().trim();
                let threadLink = $(this).find('p.title > a.title').attr('href');
                const commentsLink = $(this).find('ul.flat-list.buttons > li.first > a.comments').attr('href');

                if (commentsLink.indexOf(threadLink) !== -1) {
                    threadLink = commentsLink;
                }

                if (pontuation >= 5000) {
                    bot
                        .sendMessage(chatId,
                            "<b>/" + subredditName + "</b>\n<b>Title:</b> " + title + "\n<b>Score:</b> " + pontuation + " votes\n<b>Thread:</b> " + threadLink + "\n<b>Comments:</b> " + commentsLink + "\n",
                            {parse_mode: "HTML"});
                }
            });
        });
}
