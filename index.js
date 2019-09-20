const puppeteer = require('puppeteer');

(async() => {
    const BASE_URL = 'https://twitter.com/';
    const LOGIN_URL = 'https://twitter.com/login';
    const USERNAME = 'hellocaramello1';
    const PASSWORD = '123hellocaramello';

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(LOGIN_URL);

    await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]');
    await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]', USERNAME, { delay: 25 });
    await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]', PASSWORD, { delay: 25 });
    await page.click('button[type="submit"][class="submit EdgeButton EdgeButton--primary EdgeButtom--medium"]');

    debugger;

    // await browser.close();

})();