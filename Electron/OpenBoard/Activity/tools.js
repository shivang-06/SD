ctx.lineWidth = 5;
//To make drawing circular and smooth
ctx.lineCap="round";
ctx.lineJoin='round';

//setting pencil by default when app is opened
let activeTool = 'pencil';


let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
function handleTool(tool) {
    if (tool == "pencil") {
        if (activeTool == "pencil") {
            pencilOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "black";
            activeTool = "pencil";
            eraserOptions.classList.remove("show");
        }
    } else if (tool == "eraser") {
        if (activeTool == "eraser") {
            eraserOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "white";
            activeTool = "eraser";
            pencilOptions.classList.remove("show");
        }
    }else if (tool == "sticky") {
        createSticky();
    }else if (tool == "upload") {
        uploadFile();
    } else if (tool == "undo") {
        undoLast();
    }
}
//Handling color change
function changeColor(color) {
    ctx.strokeStyle = color;
}
//Handling size change of tool
let sliders = document.querySelectorAll("input[type='range']");
for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("change", function () {
        let width = sliders[i].value;
        ctx.lineWidth = width;
    })
}
function undoLast(){
    
}