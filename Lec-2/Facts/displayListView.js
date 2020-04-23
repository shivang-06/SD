const fs = require('fs');
const path = require('path');


function displayList(src) {
    let ans = fs.lstatSync(src).isDirectory()
    if (ans) {
        console.log(src)
        let childrens = fs.readdirSync(src)
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i])
            displayList(childPath);
        }
    } else {

        console.log(src + "*");

    }
}


displayList("src")