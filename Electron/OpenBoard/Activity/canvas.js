let undoStack = [];
let redoStack = [];
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
    //  pop the last point
    if (undoStack.length >= 2) {
        //  lines 
        for (let i = undoStack.length - 1; i > 0; i--) {
            let id = undoStack[i].id;
            if (id == "md") {
                redoStack.push(undoStack.pop());
                break;
            } else {
                // undoArr.pop();
                redoStack.push(undoStack.pop());
            }
        }
        //  clear canvas=> 
        ctx.clearRect(0, 0, board.width, board.height);
        // redraw
        redraw();
    }
}

function redoLast() {
    if (redoStack.length >= 2) {
        //  lines 
        let mdc = 0;
        for (let i = redoStack.length - 1; i >= 0; i--) {
            let { id } = redoStack[i];
            if (id == "md") {                                    
                mdc++;
                if (mdc > 1) {
                    break;
                }
                else {
                    undoStack.push(redoStack.pop());
                }
            } else {
                undoStack.push(redoStack.pop());
            }
        }
        //  clear canvas=> 
        ctx.clearRect(0, 0, board.width, board.height);
        // redraw
        redraw();
    }
}

function redraw() {
    for (let i = 0; i < undoStack.length; i++) {
        let { x, y, id, color, width } = undoStack[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (id == "md") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (id == "mm") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}