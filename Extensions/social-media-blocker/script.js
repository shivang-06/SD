console.log("this is popup");
const subBtn = document.querySelector("button");
const ul = document.querySelector("ul");
subBtn.addEventListener("click",async function(){
    const val = document.getElementById("input").value;
    if(val!=""){
        await sendToBackground(val);
        displayOnPopup(val);
    }
})

function displayOnPopup(val){
    let li = document.createElement("li");
    li.innerHTML = `${val} <i class="fas fa-times"></i>`;
    li.classList.add("list-group-item");
    ul.appendChild(li);
    let i = li.querySelector("i");
    i.addEventListener("click",function(){
        // let isRemoved = removeFromDb(i.parentNode.textContent); //remove this site from database in background
        // if(isRemoved){
        // }
        i.parentNode.remove();
    })
}
function sendToBackground(msg){
    return new Promise(function(resolve,reject){
        chrome.runtime.sendMessage(msg,function(response){
            resolve(true);
        })
    })
}