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

        let 

    } catch (err) {
        console.log(err);
    }
})();

 async function loginHelper() {
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