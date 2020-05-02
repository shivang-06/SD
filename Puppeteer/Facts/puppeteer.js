let puppeteer = require("puppeteer");
let fs = require("fs");

let cFile = process.argv[2];

//IIFE - Immediate invoking function expression
(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: ["--start-maximized"]
    });

    let pages = await browser.pages();
    let page = pages[0];
})();




