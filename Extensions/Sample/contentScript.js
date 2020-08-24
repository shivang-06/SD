function replaceImg() {

    let imgPaths = [
        "images/harry_potter_always.jpg",
        "images/joker_2019.jpg",
        "images/linkin_park.jpg",
        "images/potter_symbols.jpg",
        "images/the_one_ring.jpg"
    ];

    let aIP = document.getElementsByTagName("img"); // all images on a page

    for (let i = 0; i < aIP.length; i++) {
        let idx = Math.floor(Math.random() * imgPaths.length);
        let fullPath = chrome.extension.getURL(imgPaths[idx]);
        console.log(fullPath);
        aIP[i].src = fullPath;
    }
}

let message = { greeting: "hello" };

chrome.runtime.sendMessage(message, function (response) {
    console.log("recieved from background.js")
    console.log(response)
});
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender);
        // if (request.greeting == "hello") {
        //     console.log("Recieved from popup");
        // }
        replaceImg()
    })