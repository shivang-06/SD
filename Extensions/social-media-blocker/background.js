console.log("this is background");
let blockedSites = [];

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        blockedSites.push(request);
        console.log(blockedSites)
        sendResponse("Hello from content");
    })