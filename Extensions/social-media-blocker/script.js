console.log("this is popup");
const subBtn = document.querySelector("button");
subBtn.addEventListener("click",function(){
    const val = document.getElementById("input").value;
    console.log(val);
    displayOnPopup(val);
})

function displayOnPopup(val){
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.innerHTML = val;
    ul.appendChild(li);
    document.body.appendChild(ul);
}