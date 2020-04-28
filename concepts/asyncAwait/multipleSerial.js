let fs = require("fs");

(async function(){
    let data = await fs.promises.readFile("f1.txt")
    console.log(data);
    data = await fs.promises.readFile("f2.txt")
    console.log(data);
    data = await fs.promises.readFile("f3.txt")
    console.log(data);   
})()