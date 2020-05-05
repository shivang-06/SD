let puppeteer = require("puppeteer");
let fs = require("fs");
let cFile = process.argv[2];
let userToAdd = process.argv[3];
//IIFE - Immediate invoking function expression
(async function () {
    try {
        let data = await fs.promises.readFile(cFile);
        let { url, pwd, user } = JSON.parse(data);

        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        let tabs = await browser.pages();
        let tab = tabs[0];

        await tab.goto(url, { waitUntil: "networkidle0" });

        await tab.waitForSelector("#input-1", { visible: true });

        await tab.type("#input-1", user, { delay: 80 });
        await tab.type("#input-2", pwd, { delay: 80 });

        await Promise.all(
            [tab.click("button[data-analytics = LoginPassword]"),
            tab.waitForNavigation({ waitUntil: "networkidle0" })
            ]
        )
        //-----------------------------------Dashboard-------------------------------------

        await tab.waitForSelector("a[data-analytics = NavBarProfileDropDown]", { visible: true });
        await tab.click("a[data-analytics = NavBarProfileDropDown]");

        await Promise.all(
            [tab.waitForNavigation({ waitUntil: "networkidle0" }),
            tab.click("a[data-analytics = NavBarProfileDropDownAdministration]")]
        )

        //Manage challenges
        await tab.waitForSelector(".administration header", { visible: true })
        let mtabs = await tab.$$(".administration header ul li a");


        await Promise.all(
            [
                tab.waitForNavigation({ waitUntil: "networkidle0" }),
                mtabs[1].click("a[data-analytics=NavBarProfileDropDownAdministration]")
            ]
        )

        await handleSinglePageQuestion(tab, browser);
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

async function handleSingleQuestion(newTab, link) {

    await newTab.goto(link, { waitUntil: "networkidle0" })
    await newTab.waitForSelector(".tag")
    await newTab.click("li[data-tab = moderators]");
    await newTab.waitForSelector("input[id = moderator]", { visible: true });
    await newTab.type("#moderator", userToAdd);
    await newTab.keyboard.press("Enter")
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close()
}