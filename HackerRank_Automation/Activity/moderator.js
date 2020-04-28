let fs = require("fs")
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build()

let cFile = process.argv[2];
// let uToAdd = process.argv[3]
(async function () {
    try {
        await driver
        let data = await fs.promises.readFile(cFile)
        let { url, pwd, user } = JSON.parse(data)
        await driver.get(url);
        let usernameInputWillbeFoundPromise = driver.findElement(swd.By.css("#input-1"))
        let pwdInputWillbeFoundPRomise = driver.findElement(swd.By.css("#input-2"))
        let loginPromise = await Promise.all([usernameInputWillbeFoundPromise, pwdInputWillbeFoundPRomise])
        let uNameWIllBeSentPromise = loginPromise[0].sendKeys(user)
        let pwdWillBeSentPromise = loginPromise[1].sendKeys(pwd)
        Promise.all([uNameWIllBeSentPromise, pwdWillBeSentPromise])
        let lgnBttn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"))
        lgnBttn.click();
        console.log("Logged In");

        // let profileBttnwillBeSelectedPromise = await driver.findElement(swd.By.css(".dropdown.dropdown.dropdown-auth.profile-menu.cursor.theme-m-content.open"))
        // console.log(profileBttnwillBeSelectedPromise);
        // profileBttnwillBeSelectedPromise.click();
        let adminBtnanchor =  driver.findElement(swd.By.css(a[data-analytics=NaveBarProfile]))
        let adminPageUrl = await adminBtnanchor.getAttribute("href")
        await driver.get(adminPageUrl)
    }
    catch (err) {
        console.log(err);
    }
})()
