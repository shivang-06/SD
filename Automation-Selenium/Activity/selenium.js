require("chromedriver")
let swd = require("selenium-webdriver");
let fs = require("fs")
let credentialsFile = process.argv[2]
let metaDataFile = process.argv[3];
let username, password, gModules, QuestionToBeOpened, LectureToBeOpened, codeToBeSent


//browser build
let bldr = new swd.Builder()
//tab
let driver = bldr.forBrowser("chrome").build();

let credentialswillbeReadPromise = fs.promises.readFile(credentialsFile);
credentialswillbeReadPromise
    .then(function (credentials) {
        credentials = JSON.parse(credentials);
        username = credentials.username;
        password = credentials.password
        let siteWillBeOpenedPromise = driver.get("https://www.pepcoding.com/login")
        return siteWillBeOpenedPromise
    })
    // here ".then" are aligned one after another until first ".then" finishes its promise second ".then" will not be executed.
    .then(function () {
        //search email
        let emailWillbeSelectedPromise = driver.findElement(swd.By.css("input[type=email")) //[] => this signify attribute.
        let passwordWillbeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"))
        let combinedPromise = Promise.all([emailWillbeSelectedPromise, passwordWillbeSelectedPromise])
        return combinedPromise;
    }).then(function (combinedPromise) {
        //Fill emaid-field
        let emailWillbeSendPromise = combinedPromise[0].sendKeys(username);
        //Fill password-field
        let passwordWillbeSendPromise = combinedPromise[1].sendKeys(password);
        let combineddSendPromise = Promise.all([emailWillbeSendPromise, passwordWillbeSendPromise])
    }).then(function () {
        let SubmitButtonWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"))
        return SubmitButtonWillBeSelectedPromise
    }).then(function (submitElement) {
        let submitButtonwillBeClicked = submitElement.click()
        return submitButtonwillBeClicked
    })
    // ------------------------Reached Home Page--------------------
    .then(function () {
        //Wait for page to load
        let willWaitforpageToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".resource a")))
        return willWaitforpageToLoad;
    })
    .then(function () {
        //Find resource card
        let resourceCardAnchorwillbeSelectedPromise = driver.findElement(swd.By.css(".resource a"))
        return resourceCardAnchorwillbeSelectedPromise;

    }).then(function (resourceCard) {
        let resourceCardPageLinkWillbeSelectedPromise = resourceCard.getAttribute("href"); //link nikaal liya
        return resourceCardPageLinkWillbeSelectedPromise
    }).then(function (resourceLink) {
        let NavigateToresourcePage = driver.get(resourceLink)
        return NavigateToresourcePage
    }).then(function () {
        let siteOverlayWillbeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"))
        return siteOverlayWillbeSelectedPromise
    }).then(function (soe) {
        let WaitForOverlaytoRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000)
        return WaitForOverlaytoRemovePromise
    }).then(function () {
        let courseWillbeSelectedPromise = driver.findElement(swd.By.css("#courseCard40"))
        return courseWillbeSelectedPromise
    }).then(function (courseCard) {
        let courseCardwillBeClicked = courseCard.click()
        return courseCardwillBeClicked
    })
    //----------------------------Click Module------------------------------
    .then(function () {
        let waitForLisTabtoLoadPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")))
        // console.log("waiting for module to load");        
        return waitForLisTabtoLoadPromise
    }).then(function () {
        let modulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"))
        // console.log("Selected Modules");
        return modulesWillBeSelectedPromise;
    }).then(function (modules) {
        gModules = modules
        // console.log("modules selected " + modules.length);        
        let moduleTextPromiseArr = [];
        for (let i = 0; i < modules.length; i++) {
            let moduleNamePromise = modules[i].getText();
            moduleTextPromiseArr.push(moduleNamePromise)
        }
        let AllModulesNamesPromise = Promise.all(moduleTextPromiseArr);
        return AllModulesNamesPromise
    }).then(function (allModulesText) {
        // console.log(allModulesText);
        let i;
        // console.log(allModulesText.length);
        for (i = 0; i < allModulesText.length; i++) {
            if (allModulesText[i].includes('Recursion') === true) {
                break;
            }
        }
        // console.log(i);
        // console.log(gModules);
        let moduleWillBeClickedPromise = gModules[i].click()
        return moduleWillBeClickedPromise;
    }).then(function () {
        let metadataWillBeReadPromise = fs.promises.readFile(metaDataFile)
        return metadataWillBeReadPromise
    }).then(function (metadata) {
        metadata = JSON.parse(metadata)
        let data = metadata[0]
        LectureToBeOpened = data.lecture;
        QuestionToBeOpened = data.problem;
        fs.readFile(data.path, "utf8", function (err, res) {
            if (err) {
                console.log(err);
            } else {

                codeToBeSent = res
            }
        });
        let LectureWillBeSelectedPromise = driver.findElements(swd.By.css(".collection.row a"))
        return LectureWillBeSelectedPromise;
    }).then(function (lectures) {
        let i;
        let hrefAttributeArr = []
        // console.log(lectures);

        for (i = 0; i < lectures.length; i++) {
            let href = lectures[i].getAttribute("href")
            hrefAttributeArr.push(href)
        }

        // console.log("finding href");

        let hrefAllPromise = Promise.all(hrefAttributeArr);
        return hrefAllPromise
    }).then(function (hrefArr) {
        let i;
        // console.log(hrefArr);

        for (i = 0; i < hrefArr.length; i++) {
            if (hrefArr[i].includes(LectureToBeOpened)) {
                break;
            }
        }
        let lectureWillbeNavigatedPromise = driver.get(hrefArr[i])
        return lectureWillbeNavigatedPromise
    }).then(function () {
        let siteOverlayWillbeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"))
        return siteOverlayWillbeSelectedPromise
    }).then(function (siteOverlay) {
        // console.log("Waiting for overlay");
        let WaitForOverlaytoRemovePromise = driver.wait(swd.until.elementIsNotVisible(siteOverlay), 10000)
        return WaitForOverlaytoRemovePromise
    }).then(function () {
        let QuestionWillBeSelecedPromise = driver.findElements(swd.By.css(".collection-item a"))
        // console.log("searching Question");

        return QuestionWillBeSelecedPromise
    }).then(function (questions) {
        let anchorArr = [];
        for (let i = 0; i < questions.length; i++) {
            let anchor = questions[i].getAttribute("href")
            anchorArr.push(anchor)
        }
        let anchorAllPromise = Promise.all(anchorArr)
        return anchorAllPromise
    }).then(function (anchors) {
        let i;
        for (i = 0; i < anchors.length; i++) {
            if (anchors[i].includes(QuestionToBeOpened)) {
                break;
            }
        }
        let QuestionWillBeNavigatedPromise = driver.get(anchors[i])
        return QuestionWillBeNavigatedPromise
    }).then(function () {
        let siteOverlayWillbeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"))
        return siteOverlayWillbeSelectedPromise
    }).then(function (overlay) {
        let WaitForOverlaytoRemovePromise = driver.wait(swd.until.elementIsNotVisible(overlay), 10000)
        return WaitForOverlaytoRemovePromise
    }).then(function () {
        let editorWillBeSelectedPromise = driver.findElement(swd.By.css(".tab.bold.editorTab"))
        return editorWillBeSelectedPromise
    }).then(function (editor) {
        let editorWillBeClickedPromise = editor.click();
        return editorWillBeClickedPromise
    }).then(function () {
        let metadataWillBeReadPromise = fs.promises.readFile(metaDataFile)
        return metadataWillBeReadPromise
    }).then(function (metadata) {
        metadata = JSON.parse(metadata)
        let data = metadata[0]
        console.log("Starting to read code to be sent");

        fs.readFile(data.path, "utf8", function (err, res) {
            if (err) {
                console.log(err);
            } else {

                codeToBeSent = res
                console.log("code to be sent read completely");
            }
        });
    }).then(function () {
        let customInputWillbeSelected = driver.findElement(swd.By.css("#customInput"))
        console.log("Selecting input space");
        return customInputWillbeSelected
    }).then(function (textArea) {

        console.log("input space located starting copying -----" + textArea);
        let codeWillBeSentPromise = textArea.sendKeys(codeToBeSent)
        console.log("sent keys of code to browser");
        return codeWillBeSentPromise
    }).then(function (checking) {
        console.log("code sent----- " + checking);

    }).catch(function (err) {
        console.log(err);

    })