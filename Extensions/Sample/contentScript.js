function replaceImage() {

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