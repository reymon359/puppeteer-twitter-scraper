const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com/';
const LOGIN_URL = 'https://twitter.com/login';


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

    },

    end: async() => {
        await browser.close();
    }

};

module.exports = twitter;