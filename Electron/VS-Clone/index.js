const $ = require("jquery");
const path = require("path");
const fs = require("fs");

$(document).ready(function () {
    let src = process.cwd(); //current working directory => cwd
    let name = path.basename(src);
    let pObj = {
        id: src,
        parent: "#",
        text: name
    }
    let chArr = createChildNode(src);
    
    chArr.unshift(pObj);
    $("#tree").jstree({
        "core": {
            "data":chArr
        },
    })

})

function createChildNode(src) {
    let children = fs.readdirSync(src);
    let chArr = [];
    for (let i = 0; i < children.length; i++) {
        let cPath = path.join(src, children[i]);
        let chObj = {
            id: cPath,
            parent: src,
            text: children[i]
        }
        chArr.push(chObj);
    }
    return chArr
}