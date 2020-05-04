let request = require("request");
let fs = require("fs")
let cheerio = require('cheerio');


request("https://www.espncricinfo.com/series/19322/commentary/1187683", function (err, res, html) {
    if (err === null && res.statusCode === 200) {
        // fs.writeFile("index.html", html,function(err){})
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
//html function of cheerio => gives html content of 
//text function => returns text of the selected part
//cheerio array => index => funciton => cheerio
//html => parse => library(cheerio etc..)

function parseHtml(html) {      
    //document.querySelector => $
    let $ = cheerio.load(html)
    let heading = $("#global-header .container h1");
    let matchDetail =$(".cscore_overview .cscore_info-overview")
    let matchText = matchDetail.text();
    console.log(matchText);
    console.log(`
Last Ball commentary was : -`);
    let item = $(".item-wrapper .description")
    let text = $(item[0]).text();//here we re-wrapped (item[0]) as we used index of cheerio array
    console.log(text);

    let resultDetail = $(".cscore_notes .cscore_notes_game");
    let resultText = $(resultDetail[0]).text();
    console.log(`
Match Result :- `+resultText);
    
}
