//Array declaration
let arr = [4, 14, 17, 23, 48, 66]


//map
let arr2 = arr.map(function (num) {
    if (num % 2 == 0) {
        return ++num;
    } else {
        return --num;
    }
})

//filter
let pArr = arr2.filter(function (num) {
    for (let div = 2; div * div <= num; div++) {
        if (num % div == 0) {
            return;
        }
    }
    return num;
})

console.log(pArr);
