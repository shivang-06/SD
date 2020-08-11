function createSticky() {
    console.log("We are in tsicky");
    //create
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textbox = document.createElement("div");
    let textarea = document.createElement("textarea");
    //add classes
    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "nav-bar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    textbox.setAttribute("class", "textbox");

    //create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    textbox.appendChild(textarea);

    //add subtree to main page
    document.body.appendChild(stickyPad);

    //close => remove
    close.addEventListener("click", function () {
        stickyPad.remove();
    })
    let isOpen = true;
    //minimize
    minimize.addEventListener("click", function () {
        if (isOpen) {
            textbox.style.display = "none";
        } else {
            textbox.style.display = "block";
        }
        isOpen = !isOpen;
    })
    //move =>basically draw
    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
    navBar.addEventListener("mousedown", function (e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown=true
    })
    navBar.addEventListener("mousemove",function(e){
        if(isStickyDown){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            let{top,left} = stickyPad.getBoundingClientRect();
            stickyPad.style.top = top + dy+"px";
            stickyPad.style.left = left + dx+"px";
            initialX = finalX;
            initialY = finalY;
        }
    })
    navBar.addEventListener("mouseup",function(){
        isStickyDown = false;
    })
    navBar.addEventListener("mouseleave",function(e){
        if(isStickyDown){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            let{top,left} = stickyPad.getBoundingClientRect();
            stickyPad.style.top = top + dy+"px";
            stickyPad.style.left = left + dx+"px";
            initialX = finalX;
            initialY = finalY;
        }
    })

}