const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async() => {

    const USERNAME = 'hellocaramello1';
    const PASSWORD = '123hellocaramello';

    await twitter.initialize();

    await twitter.login(USERNAME, PASSWORD);

    await twitter.postTweet('Hello world, this is just a test message.');

    debugger;

    // await browser.close();

})();