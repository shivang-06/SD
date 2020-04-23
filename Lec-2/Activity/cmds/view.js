const fs = require('fs')
const path = require('path')
module.exports.view = function () {
    let srcFolder = arguments[0];
    let mode = arguments[1];
    let space = ""

    if (mode == "-t") {
        viewAsTree(srcFolder, space)
    } else if (mode == "-f") {
        viewAsFlatFile(srcFolder)
    } else {
        console.log("Wrong command");

    }

}

function viewAsTree(src, space) {
    let ans = fs.lstatSync(src).isDirectory()
    let file = path.basename(src)
    if (ans) {
        console.log(space + file)
        space += "       "
        let childrens = fs.readdirSync(src)
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i])
            viewAsTree(childPath, space);
        }
    } else {
        space += "       "
        console.log(space + file);

    }

}
function viewAsFlatFile(src) {
    let ans = fs.lstatSync(src).isDirectory()
    if (ans) {
        console.log(src)
        let childrens = fs.readdirSync(src)
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i])
            viewAsFlatFile(childPath);
        }
    } else {

        console.log(src + "*");

    }

}