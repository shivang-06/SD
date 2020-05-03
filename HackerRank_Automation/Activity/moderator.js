let fs = require("fs");
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build()

let cFile = process.argv[2];
let userToadd = process.argv[3];


(async function () {
    try {
        await loginHelper();

        let dropDownBtn = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"))
        await dropDownBtn.click();
        let adminLinAnchor = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"));
        await adminLinAnchor.click();
        let manageTabs = await driver.findElements(swd.By.css(".administration header ul li a"))
        // console.log(manageTabs[1]);
        
        let href = await manageTabs[1].getAttribute("href")
        // console.log(href);
        let manageChallengeURL =  href;
        await driver.get(manageChallengeURL);

        let challengeRows = await driver.findElements(swd.By.css(".backbone.block-center"));
        console.log(challengeRows);
        await challengeRows[0].click();
        

    } catch (err) {
        console.log(err);
    }
})();

async function loginHelper() {
    await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 })
    let data = await fs.promises.readFile(cFile);
    let { user, pwd, url } = JSON.parse(data);
    // reaching at given url
    await driver.get(url);

    //fining userName and pwd fields
    let userName = await driver.findElement(swd.By.css("#input-1"))
    let pwdField = await driver.findElement(swd.By.css("#input-2"))
    // filling user and pwd fields
    await userName.sendKeys(user);
    await pwdField.sendKeys(pwd);
    //finding log-in button
    let LoginBtn = await driver.findElement(swd.By.css(".ui-btn.ui-btn-large.ui-btn-primary.auth-button"))
    //clicking log-in btn
    await LoginBtn.click();
}
async function waitForLoader() {
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    await driver.wait(swd.until.elementIsNotVisible(loader));
}