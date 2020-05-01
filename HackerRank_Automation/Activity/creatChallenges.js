let fs = require("fs")
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build()
let cFile = process.argv[2];


(async function(){
    try{
        await loginHelper();

    }catch(err){
        console.log(err);
    }
})()


async function waitForLoader(){
    let WillwaitForLoader = 

}

async function loginHelper(){
    await driver.manage().setTimeout({implicit: 10000, pageLoad: 10000})
    let data = await fs.promises.readFile(cFile);
    let {user,pwd,}
}
