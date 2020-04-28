let fs = require("fs")

async function myFun(data){
    let file = await fs.promises.readFile(data,function(){
        return data;
    })
    console.log("file read is : -- "+file);
}

myFun("f1.txt")