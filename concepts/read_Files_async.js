let fs =  require("fs");

(async function(){
    let files = ["f1.txt","f2.txt","f3.txt"];
    for(let i=0;i<files.length;i++){
        let fileRead = await fs.promises.readFile(files[i],"utf8")
        console.log("file "+(i+1)+"read :=> "+fileRead);
    }
})()