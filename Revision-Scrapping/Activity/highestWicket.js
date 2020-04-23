let request = require("request");
let fs = require("fs")
let cheerio = require('cheerio');

console.log("Sending request... ... .... .");

request("https://www.espncricinfo.com/series/19322/scorecard/1187683", function (err, res, html) {
    if (err === null && res.statusCode === 200) {
        fs.writeFile("index.html", html, function (err) { })
        parseHtml(html);
    } else if (res.statusCode === 404) {
        // console.log("in else if");
        console.log("invalid url");
    } else {

        // console.log("in else");
        console.log(err);
        console.log(res.statusCode);
    }
})

function parseHtml(html) {
    let $ = cheerio.load(html)
    let bowlers = $(".sub-module.scorecard .scorecard-section.bowling table tbody tr");
    fs.writeFileSync("bowling.html", bowlers);
    let maxwckts = 0;
    let maxwcktBowler = 0;
    for(let i=0;i<bowlers.length;i++){
        let BowlerName = $($(bowlers[i]).find("td")[0]).text()
        let wckts = $($(bowlers[i]).find("td")[5]).text()
        // console.log(BowlerName + "\t" + wckts);
        // console.log("-------------------------------");
        if(wckts >= maxwckts){
            maxwckts = wckts;
            maxwcktBowler = BowlerName
        }
    }
    console.log(`Max Wicket taker => ${maxwcktBowler} 
No.of Wickets => ${maxwckts}`);
    
    
}