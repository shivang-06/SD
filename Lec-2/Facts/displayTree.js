const fs = require('fs')
const path = require('path')

function displayTree(src,space){
    let ans = fs.lstatSync(src).isDirectory()
    let file = path.basename(src)
    if (ans) {
        console.log(space+file)
        space +="       "
        let childrens = fs.readdirSync(src)
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i])
            displayTree(childPath,space);
        }
    } else {
        space +="       "
        console.log(space + file);

    }

}
let space =""
displayTree("src",space)




