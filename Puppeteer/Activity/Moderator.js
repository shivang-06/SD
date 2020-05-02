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
            [page.waitForNavigation({waitUntil:"networkidle0"}),
            page.click("button[data-analytics = LoginPassword]")]
        )
        //-----------------------------------Dashboard-------------------------------------
        
        await page.waitForSelector("a[data-analytics = NavBarProfileDropDown]", { visible: true });
        await page.click("a[data-analytics = NavBarProfileDropDown]");
        await Promise.all(
           [page.waitForNavigation({ waitUntil: "networkidle0" }),
           page.click("a[data-analytics = NavBarProfileDropDownAdministration]")]
       )
        await page.waitForSelector(".administration header", {visible: true})
        let tabs = await page.$$(".administration header ul li a");
        let href = await page.evaluate(function(el){
            return el.getAttribute("href")
        },tabs[1])
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
            await handleQuestion(page,question,process.argv[3]);
            qidx++;
        }
    }catch(err){
        console.log(err);
    }
})();

async function getMeQuestionElement(page, qidx, mpUrl) {
    let pidx = Math.floor(qidx / 10)
    let pQidx = qidx % 10;
    // page Visit
    console.log(pidx + " " + pQidx);
    //got to manage challenges page => pidx =0;
    await page.goto(mpUrl)
    await page.waitForNavigation({waitUntil: "networkidle0"});
    // await waitForLoader(page)
    //You will wait for pagination
    await page.waitForSelector(".pagination ul li", { visible: true });
    let paginations = await page.$$(".pagination ul li");
    let nxtBtn = paginations[paginations.length - 2]

    let className = await page.evaluate(function (el) {
        return el.getAttribute("class")
    }, nxtBtn);

    for (let i = 0; i < pidx; i++) {
        if (className == "disabled")
            return null;
        }
        await nxtBtn.click()
        // wait for page visible
        await page.waitForSelector(".pagination ul li",{visible: true})
        // find elements
        paginations = await page.$$(".pagination ul li");
        nxtBtn = paginations[paginations.length-2];
        //attribute
        className = await page.evaluate(function(el){
            return el.getAttribute("class")
        },nxtBtn);
        //pageQuestion
        let challengeList = await page.$$(".backbone.block-center");
        if(challengeList.length>pQidx){
            return challengeList[pQidx];
        }else{
            return null
        }
}


async function handleQuestion(page,question,uToAdd){
    await Promise.all([page.waitForNavigation({ waitUntil :"networkidle0"}),question.click()]);
    await page.waitForSelector("li[data-tab=moderators]",{visible: true})
    await page.click("li[data-tab=moderators]");
    await page.waitForSelector("input[id=moderator]" , {visible: true});
    await page.type("#moderator",uToAdd);
    await page.keyboard.press("Enter");
    await page.click(".save-challenge.btn.btn-green")
}
