// file,directory
//directory -> content
let fs = require("fs");
let path = require("path");


function checkPathisDirOrNot(src) {
    let ans =  fs.lstatSync(src).isFile();
    return ans;
}

function childrenReader(src){
    let childrens = fs.readdirSync(src);
    return childrens;
}


function viewAsFlatfile(src) {
    let isFile = checkPathisDirOrNot(src)
    if (isFile) {
        console.log(src + "*");
    } else {
        //print path
        console.log(src); // d10
        //childerns => content read
        let children = childrenReader(src)
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let childPath = path.join(src,child); // d10/d20
            
            //children => viewAsFlatfile
            viewAsFlatfile(childPath); // recursive call to print childrens in case of directory
        }
    }
}

viewAsFlatfile(process.argv[2])