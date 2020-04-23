function isPrime(number) {
    if (number <= 1) {
        return false
    }
    for (let i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}

Array.prototype.myfilter = function (cb) {
    let newarr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i]) === true) {
            newarr.push(this[i])
        }
    }
    return newarr;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let primeArr = arr.myfilter(isPrime)
console.log(primeArr);
