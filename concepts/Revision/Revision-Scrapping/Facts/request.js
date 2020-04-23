let request = require("request");
let fs = require("fs")

console.log("Before");
request("https://www.google.com", function (err, res, html) {
    if (err === null && res.statusCode === 200) {
        // console.log("in if");

        fs.writeFile("index.html", html, function () {
            console.log("Written file to disk");
        })
    } else if (res.statusCode === 404) {
        // console.log("in else if");
        console.log("invalid url");
    } else {

        // console.log("in else");
        console.log(err);
        console.log(res.statusCode);
    }
})

console.log("After");
