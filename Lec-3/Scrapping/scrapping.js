const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

request("https://www.espncricinfo.com/series/19322/scorecard/1187679", function (err, res, html) { // res stores the response form the url.
    if (err == null && res.statusCode == 200) { // Status code checks what the status of response is.
        // fs.writeFileSync("crick.html",html) // this writes html into crick.html file
        console.log("REQUESTING FILE");
        parseHtml(html);
    } else if (res.statusCode == 404) {
        console.log("Error 404 : Page not Found");
    }
    else {
        console.log(err);
        console.log(res.statusCode);


    }
})

function parseHtml(html) {
    const $ = cheerio.load(html);
    let tableArr = $(".scorecard-section.bowling table tbody tr");
    let maxWicketTaker = ""
    let maxWickets = 0;
    for (let i = 0; i < tableArr.length; i++) {
        let tdArr = $(tableArr[i]).find("td");
        let wicket = $(tdArr[5]).html()
        let bowlerName = $(tableArr[i]).find("td a").html();
        if (wicket > maxWickets) {
            maxWicketTaker = bowlerName;
            maxWickets = wicket;
        }
    }
    console.log(maxWicketTaker + "||" + maxWickets)
    // // console.log(length);
    // for(let i=0;i<tableArr.length;i++){
    // //   tableHtml += $(tableArr[i]).html()+"<br>"
    // }
    // fs.writeFileSync("table.html", tableArr)

    console.log("File loaded to Disk");

}