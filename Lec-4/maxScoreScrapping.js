let cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')

let seriesId = process.argv[2];

request(`https://www.espncricinfo.com/series/${seriesId}/`, function(err,res,html){
    if (err == null && res.statusCode == 200) { // Status code checks what the status of response is.
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
function parseHtml(html){
    const co = cheerio.load(html)
    let cardsHtml = co(".cscore.cscore--final.cricket.cscore--watchNotes")
    for(let i = 0 ;i<cardsHtml.length;i++){
        let format = co(cardsHtml[i]).find("cscore_info-overview").html();
        let ans = format.includes("T20I") || format.includes("ODI")
        if(ans){

            let url = co(cardsHtml[i]).find(".cscore_list a")
        }
    }
}