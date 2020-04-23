// Functions are first class citizens
//functions are variables


//Assignment
let a = 10
let b = a
console.log(b);

//********************************************************
//Pass a variable as a parameter
function myfun(varname) {
    console.log(varname);

}

myfun(10);
myfun("i am string passed as parameter")
myfun(true)

//********************************************************

//You can return a variable from a function
function specialfun() {
    return "some value"
}

let valfrfun = specialfun()
console.log(valfrfun);
