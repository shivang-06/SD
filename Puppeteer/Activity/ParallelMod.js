let puppeteer = require("puppeteer");
let fs = require("fs");

let cFile = process.argv[2];

//IIFE - Immediate invoking function expression
(async function () {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        let pages = await browser.pages();
        let page = pages[0];
        let data = await fs.promises.readFile(cFile)
        let { url, pwd, user } = JSON.parse(data)
        await page.goto(url, { waitUntil: "networkidle0" });

        await page.type("#input-1", user)
        await page.type("#input-2", pwd)
        await Promise.all(
            [page.waitForNavigation({ waitUntil: "networkidle0" }),
            page.click("button[data-analytics = LoginPassword]")]
        )
        //-----------------------------------Dashboard-------------------------------------

        await page.waitForSelector("a[data-analytics = NavBarProfileDropDown]", { visible: true });
        await page.click("a[data-analytics = NavBarProfileDropDown]");
        await Promise.all(
            [page.waitForNavigation({ waitUntil: "networkidle0" }),
            page.click("a[data-analytics = NavBarProfileDropDownAdministration]")]
        )
        await page.waitForSelector(".administration header", { visible: true })
        let tabs = await page.$$(".administration header ul li a");
        let href = await page.evaluate(function (el) {
            return el.getAttribute("href")
        }, tabs[1])
        // await tabs[1].click();
        let mpUrl = "https://www.hackerrank.com" + href;
        await page.goto(mpUrl);


        let qidx = 0;
        while (true) {
            let question = await getMeQuestionElement(page, qidx, mpUrl);
            if (question == null) {
                console.log("All questions processed");
                return;
            }
            await handleQuestion(page, question, process.argv[3]);
            qidx++;
        }
    } catch (err) {
        console.log(err);
    }
})();

async function handleSinglePageQuestion(tab, browser) {
    await tab.waitForSelector(".backbone.block-center");
    let qoncPage = await tab.$$(".backbone.block-center");
    let pArr = [];
    for (let i = 0; i < qoncPage.length; i++) {
        let href = await tab.evaluate(function (elem) {
            return elem.getAttribute("href");

        }, qoncPage[i]);

        let newTab = await browser.newPage();

        let mWillAddedPromisetocQ = handleSingleQuestion(newTab, "https://www.hackerrank.com" + href);
        pArr.push(mWillAddedPromisetocQ);
    }
    await Promise.all(pArr)
    await tab.waitForSelector(".pagination ul li");
    let paginationBtn = await tab.$$(".pagination ul li")
    let nxtBtn = paginationBtn[paginationBtn.length - 2];
    let className = await tab.evaluate(function (nxtBtn) {
        return nxtBtn.getAttribute("href")
    }, nxtBtn);
    if (className == "disabled") {
        return;
    }
    else {
        await Promise.all([nxtBtn.click(), tab.waitForNavigation({ waitUntil: "networkidle0" })]);
        await handleSinglePageQuestion(tab, browser);
    }
}

async function handleSingleQuestion(newTab, link){
    await newTab.goto(link, { waitUntil: "networkidle0" })
    await newTab.waitForSelector(".tag")
    await newTab.click("li[data-tab = moderators]");
    await newTab.waitForSelector("input[id = moderator]", { visible: true });
    await newTab.type("#moderator", "shivangsharma15");
    await newTab.keyboard.press("Enter")
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close()
}