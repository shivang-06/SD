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
       
        for(let i=0;i<1;i++){
            // let rowElement = await findRow(i);
            // await rowElement.click();
            await challengeRows[i].click();
            await waitForLoader();
            await addModerator();            
            let modTextField = await driver.findElement(swd.By.css("input[id = moderator]"))
            await modTextField.sendKeys(userToadd);
            let addBtn = await driver.findElement(swd.By.css(".btn.moderator-save"))
            await addBtn.click();
            let saveBtn = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"))
            await saveBtn.click();
            await driver.get(manageChallengeURL)
        }
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
async function addModerator(){
    // let spanEl = await driver.findElement(swd.By.css("span.tag"));
    // await driver.wait(swd.until.elementLocated(spanEl),10000)
    await driver.wait(swd.until.elementLocated(swd.By.css('span.tag')),5000)
    let modTab = await driver.findElement(swd.By.css("li[data-tab = moderators]"))
    // console.log("about to click moderator");      
    await modTab.click();
    // console.log("moderator clicked");
}

async function findRow(){


}