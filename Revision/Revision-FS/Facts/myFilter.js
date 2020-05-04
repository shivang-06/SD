let arr = [4, 14, 17, 23, 48, 66]
// let arr=[5,7,11,13,17]


function filterPrime(number) {
    for (let i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            return false
        }
    }
    return true;
}

//creating prototype method
Array.prototype.myfilter = function (cb) {
    let newarr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i]) == true) {
            newarr.push(this[i])
        }
    }
    return newarr;
}

let myarr = arr.myfilter(filterPrime);
console.log(myarr);
