const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async() => {

    const USERNAME = 'hellocaramello1';
    const PASSWORD = '123hellocaramello';

    await twitter.initialize();

    await twitter.login(USERNAME, PASSWORD);

    debugger;

    // await browser.close();

})();