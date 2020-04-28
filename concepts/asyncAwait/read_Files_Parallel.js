let fs = require("fs");

(async function(){
    let f1 = await fs.promises.readFile("f1.txt")
    console.log(f1);
    
})()
(async function(){
    let f2 = await fs.promises.readFile("f2.txt")
    console.log(f2);
    
})()
(async function(){
    
    let f3 = await fs.promises.readFile("f3.txt")
    console.log(f3);
})()