let fs = require("fs")
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr =  new swd.Builder();
let driver =  bldr.forBrowser("chrome").build()

let cFile =  process.argv[2]
let uToAdd =  process.argv[3]
(function(){
    let data = await fs.promises.readFile(cFile)
    let {url,pwd,user} = JSON.parse(data)
    await driver.get(url);
    let  usernameInputWillbeFound = 
})()
