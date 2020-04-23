let fs = require("fs")

fs.readFile("f1.txt",function(err,data){
    if(data.byteLength>20){
        fs.readFile("f2.txt",function(err,data){
            console.log("f2 " + data.byteLength);
            
        })        
    }else{
        fs.readFile("f3.txt",function(err,data){
            console.log("f3" + data.byteLength);
            
        })
    }
})