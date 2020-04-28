let fs = require("fs");

(async function(){
    let f1 = await fs.promises.readFile("f1.txt","utf8");
    console.log("LENTGH  "+ f1.length);
    
    if(f1.length>120){
        let f2 = await fs.promises.readFile("f2.txt","utf8")
        console.log("FILE IN IF : "+f2);
        
    }else{
        let f3 = await fs.promises.readFile("f3.txt","utf8");
        console.log("FILE IN ELSE+ "+f3);
    }
    console.log(f1);
    
})()