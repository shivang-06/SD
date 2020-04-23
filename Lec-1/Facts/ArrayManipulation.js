let array = [2, 6, 17, 28, 46, 68];
let newarr = [];

function transform(num) {
    if (num % 2 === 0) {
        return ++num;
    } else {
        return --num;
    }
}

function filterPrime(number) {
    for (let i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}
function mymap(array, transform) {
    for (var i = 0; i < array.length; i++) {
        array[i] = transform(array[i])
    }


}

//filter function
function myfilter(array, filterPrime) {
    for (var i = 0; i < array.length; i++) {
        if (filterPrime(array[i]) == true)
            newarr.push(array[i])
    }
}
mymap(array, transform);
myfilter(array, filterPrime);

// let mappedArr =array.map(transform);
// const primeArr = mappedArr.filter(filterPrime);

console.log(newarr);
