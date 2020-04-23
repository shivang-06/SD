let fs = require("fs");
let path = require("path");

module.exports.view = function(){
    let src = arguments[0];
    let mode = arguments[1];
    if(mode == "-t"){
        viewAsTree(src,"");
    }else if(mode == "-f"){
        viewAsFlatfile(src,path.basename(src));
    }else{
        console.log("wrong mode");
    }
}

function isFile(src) {
    let ans = fs.lstatSync(src).isFile();
    return ans;
}

function childrenReader(src) {
    let childrens = fs.readdirSync(src);
    return childrens;
}


//For tree view
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
            viewAsTree(childPath, indent + "\t");
        }

    }
}

//for flat file view
function viewAsFlatfile(src , toprint) {
    let ans = isFile(src);
    if (ans) {
        console.log(toprint + "*");
    } else {
        //print path
        console.log(toprint); // d10
        //childerns => content read
        let children = childrenReader(src)
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child); // d10/d20
            
            //children => viewAsFlatfile
            viewAsFlatfile(childPath,path.join(toprint,child)); // recursive call to print childrens in case of directory
        }
    }
}