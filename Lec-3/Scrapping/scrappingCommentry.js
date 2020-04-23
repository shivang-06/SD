const request = require('request')
const cheerio = require('cheerio') 
const fs = require('fs')

let seriesId = process.argv[2]
let commentryId = process.argv[3]

request(`https://www.espncricinfo.com/series/${seriesId}/commentary/${commentryId}`, function (err, res, html) { // res stores the response form the url.
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
    console.log("parsing Html");
    
    let $ = cheerio.load(html)
    let lastCommentry = $(".item-wrapper .description").html();
    fs.writeFileSync("commentry.html",lastCommentry);


}