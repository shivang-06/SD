let path = require("path");
let fs = require("fs")

module.exports.treefy = function () {
    let src = arguments[0];
    let dest = arguments[1];
    let root = require(path.join(src, "metadat.json"))
    treefy(src, dest, root)
}


function treefy(src, dest, node) {
    //src => directory or not
    if (node.isFile) {
        //file copy
        let srcPath = path.join(src, node.newfileName)
        let destPath = path.join(dest, node.oldName)
        fs.copyFileSync(srcPath, destPath)

    } else {
        //work
        let dirPath = path.join(dest, node.Name)
        //directory create
        fs.mkdirSync(dirPath)
        //children
        let children = node.children
        //loop
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childPath = dirPath;
            treefy(src, childPath, child)
        }

    }
}