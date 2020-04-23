const path = require('path')
const fs = require('fs')
module.exports.treefy = function () {
    src = arguments[0]
    dest = arguments[1]
    let root = require(path.join(src, "metadata.json"));
    // root = JSON.parse(root)
    console.log(root);
    treefyFolder(src, dest, root);
}

function treefyFolder(src, dest, node) {
    if (node.isfile == true) {
        //Create a file in destination directory and rename them
        let oldFile = path.join(src, node.newName)
        let newFile = path.join(dest, node.name)
        fs.copyFileSync(oldFile, newFile)

    } else {
        let dirName = path.join(dest, node.name)
        fs.mkdirSync(dirName);
        let childrens=node.children;
        console.log(childrens)
        for (let i = 0; i <childrens.length; i++) {
            treefyFolder(src, dirName, node.children[i])
        }
    }
}