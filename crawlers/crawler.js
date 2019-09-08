const fs = require('fs');

const request = require('superagent');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');

const redditUrl = 'https://old.reddit.com';
const arguments = process.argv[2];

fs.writeFileSync('reddit.txt', 'New in reddit \n');
if (arguments) {
    const wantedSubreddits = arguments.split(';');

    wantedSubreddits.forEach((subreddit) => {
        const subredditUrl = `${redditUrl}/r/${subreddit.toString()}/`;

        searchPosts(subredditUrl, subreddit);
    });
} else {
    searchPosts(redditUrl + '/r/all/', 'all');
}

async function searchPosts(url, subreddit) {
    try {
        const response = await request.get(url);

        const dom = htmlparser2.parseDOM(response.text);

        const $ = cheerio.load(dom);

        $('div#siteTable > div.thing').each(function (index) {
            const pontuation = $(this).attr('data-score');
            const title = $(this).find('p.title > a.title').text().trim();
            let threadLink = $(this).find('p.title > a.title').attr('href');
            const commentsLink = $(this).find('ul.flat-list.buttons > li.first > a.comments').attr('href');

            if (commentsLink.indexOf(threadLink) !== -1) {
                threadLink = commentsLink;
            }

            if (pontuation >= 5000) {
                fs.appendFileSync('reddit.txt', '/r/' + subreddit + '\n' +
                    'Title: ' + title + '\n' +
                    'Score: ' + pontuation + '\n' +
                    'Thread: ' + threadLink + '\n' +
                    'Comments: ' + commentsLink + '\n' + '\n');
            }
        });
        console.log('Look at reddit.txt');
    } catch (error) {
        console.log("Error: " + error);
    }
}
