const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com/';
const LOGIN_URL = 'https://twitter.com/login';
const USERNAME_URL = (username) => `https://twitter.com/${username}`;


let browser = null;
let page = null;

const twitter = {

    initialize: async() => {

        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();

        await page.goto(BASE_URL);

    },

    login: async(username, password) => {

        await page.goto(LOGIN_URL);
        await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]');
        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]', username, { delay: 25 });
        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]', password, { delay: 25 });
        await page.click('button[type="submit"][class="submit EdgeButton EdgeButton--primary EdgeButtom--medium"]');
        await page.waitFor('#tweet-box-home-timeline');
        await page.waitFor(1000);
    },

    postTweet: async(message) => {
        let url = await page.url();

        // checking the URL
        if (url != BASE_URL) {
            await page.goto(BASE_URL);
        }

        await page.waitFor('#tweet-box-home-timeline');
        await page.click('#tweet-box-home-timeline');
        await page.waitFor(500);
        await page.keyboard.type(message, { delay: 50 }); // Another way to type
        await page.click('button[class="tweet-action EdgeButton EdgeButton--primary js-tweet-btn"]');
    },

    getUser: async(username) => {

        let url = await page.url();

        if (url != USERNAME_URL(username)) {
            await page.goto(USERNAME_URL(username));
        }

        await page.waitFor('h1[class="ProfileHeaderCard-name"] > a');

        let details = await page.evaluate(() => {
            return {
                fullName: document.querySelector('h1[class="ProfileHeaderCard-name"] > a').innerText,
                description: document.querySelector('p[class="ProfileHeaderCard-bio u-dir"]').innerText,
                followerCount: document.querySelector('li[class="ProfileNav-item ProfileNav-item--followers"] > a > span[data-count]').getAttribute('data-count')
            }
        })


        return details;

    },

    end: async() => {
        await browser.close();
    }

};

module.exports = twitter;