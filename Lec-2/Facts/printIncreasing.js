function printIncreasing(num) {
    if (num > 5) {
        return
    }
    console.log(num);
    printIncreasing(num + 1)
}

printIncreasing(1)
