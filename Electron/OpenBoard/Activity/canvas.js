let undoStack = [];
let redoStack =[];
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
    let mdp = {
        x,
        y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    undoStack.push(mdp);
})

// on move
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        console.log("Mouse move");


        // lineTo
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y) - top;
        ctx.lineTo(x, y);
        // stroke
        ctx.stroke();
        let mmp = {
            x,
            y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoStack.push(mmp);
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



function undoLast() {
    //pop the last point and add it in redo stack
    redoStack.push(undoStack.pop());
    //clear the board
    ctx.clearRect(0, 0, board.width, board.height);
    //redraw after undo
    redraw();
}

function redraw(){
    for (let i = 0; i < undoStack.length; i++) {
        let {x,y,id,color,width}  = undoStack[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if(id == "md"){
            ctx.beginPath();
            ctx.moveTo(x,y);
        }else if(id == "mm"){
            ctx.lineTo(x,y);
            ctx.stroke();
        }            
    }
}