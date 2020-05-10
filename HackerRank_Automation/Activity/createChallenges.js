let fs = require("fs")
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build()
let cFile = process.argv[2];
let questionsFile = process.argv[3];

    (async function () {
        try {
            await loginHelper();
            let dropDownBtn = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"))
            await dropDownBtn.click();
            let adminLinAnchor = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"));
            await adminLinAnchor.click();
            await waitForLoader();
            let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"))
            console.log(manageTabs);
            console.log("Checking array "+manageTabs[1]);
            
            await manageTabs[1].click();

            let manageChallengePage = await driver.getCurrentUrl();
            let questions = require(questionsFile);
            for (let i = 0; i < questions.length; i++) {
                await driver.get(manageChallengePage)
                await waitForLoader();
                await createNewChallenge(questions[i]);
            }

        } catch (err) {
            console.log(err);
        }
    })()

async function createNewChallenge(question){
    let createChallenge = await  driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
    await createChallenge.click();
    await waitForLoader();

    let eSelector = ["#name", "textarea.description", "#problem_statement-container .CodeMirror div textarea", "#input_format-container .CodeMirror textarea", "#constraints-container .CodeMirror textarea", "#output_format-container .CodeMirror textarea", "#tags_tag"];
    let eWillBeSelectedPromise = eSelector.map(function(s){
        return driver.findElement(swd.By.css(s));
    })

    let AllElements = await Promise.all(eWillBeSelectedPromise);
    // submit name, description
    let NameWillAddedPromise = AllElements[0].sendKeys(question["Challenge Name"])
    let descWillAddedPromise = AllElements[1].sendKeys(question["Description"])

    await Promise.all([NameWillAddedPromise,descWillAddedPromise]);

    await editorHandler("#problem_statement-container .CodeMirror div", AllElements[2], question["Problem Statement"]);
    await editorHandler("#input_format-container .CodeMirror div", AllElements[3], question["Input Format"]);
    await editorHandler("#constraints-container .CodeMirror div", AllElements[4] , question["Constraints"]);
    await editorHandler("#output_format-container .CodeMirror div", AllElements[5], question["Output Format"]);
    // tags
    let TagsInput = AllElements[6];
    await TagsInput.sendKeys(question["Tags"]);
    await TagsInput.sendKeys(swd.Key.ENTER);

    let submitBtn =  driver.findElement(swd.By.css(".save-challenge.btn.btn-green"));
    await submitBtn.click();
    
}
async function waitForLoader() {
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    await driver.wait(swd.until.elementIsNotVisible(loader));
}

async function loginHelper() {
    await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 })
    let data = await fs.promises.readFile(cFile);
    let { url , pwd, user} = JSON.parse(data);
    //Login page

    await driver.get(url);
    let unInputWillBeFoundPromise = driver.findElement(swd.By.css("#input-1"));
    let psInputWillBeFoundPromise = driver.findElement(swd.By.css("#input-2"));
    let unNpsEl = await Promise.all([unInputWillBeFoundPromise,psInputWillBeFoundPromise])
    let uNameWillbeSendPromise = unNpsEl[0].sendKeys(user);
    let pWillBeSendPromise = unNpsEl[1].sendKeys(pwd);
    await Promise.all([uNameWillbeSendPromise,pWillBeSendPromise])
    let loginBtn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"));
    await loginBtn.click();
}

async function editorHandler(parentSelector, element, data) {
    let parent = await driver.findElement(swd.By.css(parentSelector));
    // selenium => browser js execute 
    await driver.executeScript("arguments[0].style.height='10px'", parent);
    await element.sendKeys(data);
  }