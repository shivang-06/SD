let fs = require("fs")
let path = require("path");
let uniqueid = require("uniqid")

module.exports.untreefy = function () {
    let src = arguments[0];
    let dest = arguments[1];

    let root = {};
    untreefy(src, dest, root)
    //Create JSON file
    fs.writeFileSync(path.join(dest, "metadata.json"), JSON.stringify(root))

}

function isFile(src) {
    let ans = fs.lstatSync(src).isFile();
    return ans;
}

function childrenReader(src) {
    let childrens = fs.readdirSync(src);
    return childrens;
}

function untreefy(src, dest, node) {
    //check directory or not
    let ans = isFile(src);
    if (ans) {
        //rename file
        let newName = uniqueid();
        //src => dest
        let destPath = path.join(dest, newName);
        //storing data  
        node.isFile = true
        node.oldName = path.basename(src)
        node.newfileName = newName

        //copy data
        fs.copyFileSync(src, destPath);
        console.log(`File copied from ${path.basename(src)} to ${path.basename(destPath)}`);
    } else {

        //Store information
        node.isFile = false
        node.Name = path.basename(src)
        node.children = []
        //Getting childrens of directory
        let children = childrenReader(src)
        //looping to get children info
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childPath = path.join(src, child);
            let chobj = {}//to store children info
            untreefy(childPath, dest, chobj)//recursive call
            node.children.push(chobj);//adding children info to node
        }

    }

}