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
    let data = await fs.promises.readFile(cFile)
    let { url, pwd, user } = JSON.parse(data)
    await page.goto(url, { waitUntil: "networkidle0" });

    await page.type("#input-1", user)
    await page.type("#input-2", pwd)
    await page.click("button[data-analytics = LoginPassword]");
    //--------------Dashboard-------------------------------------
    await page.waitForNavigation({ waitUntil: "networkidle0" })
    await page.waitForSelector("a[data-analytics = NavBarProfileDropDown]", { visible: true });

    await page.click("a[data-analytics = NavBarProfileDropDown]");
    await page.click("a[data-analytics = NavBarProfileDropDownAdministration]")
    await waitForLoader(page)

    let tabs = await page.$$(".administration header ul li");
    await tabs[1].click();
    let mpUrl = await page.url();
    let qidx = 0;
    while (true) {
        let question = await getMeQuestionElement(page,qidx,mpUrl);
        if(question == null){
            console.log("All questions processed");
            return;
        }
        qidx++;}})();





