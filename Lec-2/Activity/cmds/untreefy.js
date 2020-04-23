const fs = require('fs') // To read data and files in directories.
const path = require('path') //To join paths for traversing in directories
let uniqid = require('uniqid') // Used for renaming copied files and to give them some unique name



module.exports.untreefy = function (src, dest) {
    let root = {}
    untreefyFolder(src, dest , root)
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root)) //To write into json file format.
    console.log("JSON CREATED");
    console.log("Files were copied to the destination");
}

function untreefyFolder(src, dest, node) {
    let ans = fs.lstatSync(src).isDirectory() // This checks whether the given path is a file or a directory.
    let file = path.basename(src)  // Gives the file name from the provided path.
    let uniqueName = uniqid()
    if (ans) {
        node.isfile = false
        node.name = path.basename(src)
        node.children = []

        let childrens = fs.readdirSync(src)  // Traverse in the directory and return folders in the directory as children
        for (let i = 0; i < childrens.length; i++) {
            let currentChildObj = {}
            let childPath = path.join(src, childrens[i]) //Gives the path of children folders or files
            untreefyFolder(childPath, dest, currentChildObj);  // Recursive call so that path to the last folder can be accessed
            node.children.push(currentChildObj)
        }
    } else {
        node.isfile = true
        node.name = path.basename(src)
        node.newName = uniqueName
        fs.copyFileSync(src, path.join(dest, uniqueName)); // Copy the files at the destination and renaming to give them unique name.
    }
}