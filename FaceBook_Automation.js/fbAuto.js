let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");

let pUrl = process.argv[3];
let nPost = process.argv[4];

(async function(){
    try{
        let data = await fs.promises.readFile(cFile);
        let {url , pwd , user} = JSON.parse(data);

        //Launch browser
        let browser = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args:["--start-maximized","--disable-notifications"]
        })

        //tab
        let tabs = (await browser).pages();
        let tab = tabs[0];
        
        await tab.goto(url,{waitUntil: "networkidle2"});
        await tab.waitForSelector("input[type = email");
        await tab.type("input[type = email",user,{delay:100});
        await tab.type("input[type = password",pwd,{delay:100});
   
        await Promise.all([
            tab.click(".login_form_button"),
            tab.waitForNavigation({waitUntil: "networkidle2"})
        ])
        await tab.goto(pUrl , {waitUntil: "networkidle2"});
        await tab.waitForSelector("div[data-key = tab_posts]");

        await Promise.all([
            tab.click("div[data-key = tab_posts]"),
            tab.waitForNavigation({waitUntil: "netwrokidle2"})
        ])

        let idx =0;
        do{
            //posts => 7 Post => are loaded
            await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
            //children selector

            let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8");

            let post = elements[idx];
            await tab,waitForSelector("._666k ._8c74");
            let like = await post.$("._666k ._8c74");
            await like.click({delay: 100});
            idx++;
        }while(idx<nPost)
    }catch(err){
        console.log(err);
    }
})()