const fs = require('fs');

const request = require('superagent');
const cheerio = require('cheerio');
const url = require('url-parse');
const htmlparser2 = require('htmlparser2');

const redditUrl = 'https://old.reddit.com';
const arguments = process.argv[2];

if (arguments) {
    const wantedSubreddits = arguments.split(';');

    wantedSubreddits.forEach((subreddit) => {
        const subredditUrl = `${redditUrl}/r/${subreddit.toString()}/`;

        searchPosts(subredditUrl, subreddit);
    });
} else {
    searchPosts(redditUrl, 'init');
}

async function searchPosts(url, subreddit) {
    try {
        const response = await request.get(url);

        const dom = htmlparser2.parseDOM(response.text);

        const $ = cheerio.load(dom);

        $('div#siteTable > div.thing').each(function (index) {
            const pontuation = $(this).attr('data-score');
            const title = $(this).find('p.title > a.title').text().trim();
            const commentsLink = `https://old.reddit.com/r/${subreddit}/` + $(this).attr('data-permalink');
            const threadLink = $(this).attr('data-url');

            if (pontuation >= 5000) {
                fs.appendFileSync('reddit.txt', subreddit + '\n' + title + '\n' + pontuation + '\n' + threadLink + '\n' + commentsLink + '\n');
            }
        })

    } catch (error) {
        console.log("Error: " + error);
    }
}
