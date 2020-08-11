// press mouse
let isPenDown = false;
board.addEventListener("mousedown", function (e) {
    // begin path
    ctx.beginPath();
    // move to mouse pointers location
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y) - top
    ctx.moveTo(x, y);
    console.log("Mouse down")
    isPenDown = true;
})
// let toolBox = document.querySelectorAll(".tool-options");

// on move
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        console.log("Mouse move");
        // for (let i = 0; i < toolBox.length; i++) {
        //     toolBox[i].classList.add("hide");
        // }

        // lineTo
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y) - top;
        ctx.lineTo(x, y);
        // stroke
        ctx.stroke();

    }
})
window.addEventListener("mouseup", function () {
    // close Path
    console.log("Mouse up")
    // ctx.closePath();
    isPenDown = false;
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
for (let i = 0; i < toolBox.length; i++) {
    toolBox[i].addEventListener("click",function(){
        toolBox[i].classList.add("show");
    })
}