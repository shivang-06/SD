// packages
const {exec} = require("child_process") // For executing calculator app
const opn = require('opn'); //Opening website using chrome.

//Server
function takeRequest(data , success , failure){
    if(data % 2 ==0 ){
        success();
    }
    else{
        failure();
    }
}

//Client

function success(){
    // exec("calc").unref()

    // FB page on chrome;
    opn('http://github.com/', {app: ['Chrome']});   
    console.log("Your request was successful");
}
function failure(){
    console.log("Your request failed");
    
}

takeRequest(16,success,failure);