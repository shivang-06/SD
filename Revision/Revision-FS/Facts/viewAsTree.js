let fs = require("fs");
let path = require("path");

function isFile(src) {
    let ans = fs.lstatSync(src).isFile();
    return ans;
}

function childrenReader(src) {
    let childrens = fs.readdirSync(src);
    return childrens;
}


function viewAsTree(src, indent) {
    //check directory or not
    let ans = isFile(src);

    if (ans) {
        //print path
        console.log(indent + path.basename(src) + "*");
    } else {
        //print directory path
        console.log(indent + path.basename(src));
        //traversing directory
        let children = childrenReader(src);
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            childPath = path.join(src, child)
            viewAsTree(childPath, indent + "   ");
        }

    }
}
viewAsTree(process.argv[2], "")