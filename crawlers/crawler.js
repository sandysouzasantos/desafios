const fs = require('fs');

const request = require('superagent');
const cheerio = require('cheerio');
const url = require('url-parse');
const htmlparser2 = require('htmlparser2');

const redditUrl = 'https://old.reddit.com/r/worldnews/';

request
    .get(redditUrl)
    .end((error, response) => {
        if (error) {
            console.log("Error: " + error);
        }

        const dom = htmlparser2.parseDOM(response.text);

        const $ = cheerio.load(dom);

        $('div#siteTable > div.thing').each(function (index) {
            const subreddit = $(this).attr('data-subreddit');
            const pontuation = $(this).attr('data-score');
            const title = $(this).find('p.title > a.title').text().trim();
            /* const commentsLink = $(this).find();
             const threadLink = $(this).find();*/

            if(pontuation >= 5000){
                fs.appendFileSync('reddit.txt',  subreddit+ '\n' + title + '\n' + pontuation + '\n');
                console.log(subreddit, pontuation, title);
            }
        })
    });
