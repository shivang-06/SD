//Library based coding

function lib(num) {
    for (let div = 2; div * div <= num; div++) {
        if (num % div == 0) {
            return false
        }
    }
    return true
}

let ans = lib(23)
if (ans) {
    console.log("prime");

} else {
    console.log("not prime");
}

//************************************************** */

// Framework style coding

//framework
let { exec } = require("child_process");
function framework(data, scb, fcb) {
    for (let div = 2; div * div <= data; div++) {
        if (data % div == 0) {
            fcb();
            return;

        }
    }
    scb();
}



//user
function success() {
    exec("calc");
}

function fail() {
    exec("start chrome")
}

framework(23, success, fail)