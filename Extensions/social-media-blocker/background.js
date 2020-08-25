console.log("this is background");
let blockedSites = [];

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        blockedSites.push({ site: request, time: 10 });
        sendResponse("Hello from content");
    })

async function init() {
    if (blockedSites.length > 0) {
        // query for current tab
        let tab = await getCurrentTab();

        if (tab) {
            let cTabUrl = tab.url;
            for (let i = 0; i < blockedSites.length; i++) {
                let isMatching = cTabUrl.includes(blockedSites[i].site);
                if (isMatching) {

                    blockedSites[i].time--;
                    console.log("time remaining  "+ blockedSites[i].time);
                    if (blockedSites[i].time <= 0) {
                        // close current tab
                        console.log("closed"+ blockedSites[i].site);
                        await closeTab(tab.id);
                    }
                }

            }
        }

    }
}
function getCurrentTab() {
    return new Promise(function (resolve, reject) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]); // tabs[0] => latest tab returned 
        })
    })

}
setInterval(init, 1000);
function closeTab(id){
    return new Promise(function(resolve,reject){
        
    })
}