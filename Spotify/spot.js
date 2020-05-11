let pupperteer = require("puppeteer");
let fs = require("fs");
let cFile = process.argv[2];
let albumFile = process.argv[3];
let albums = require(albumFile);

let SongArr = [];
let text;
(async function () {
    try {

        let data = await fs.promises.readFile(cFile);
        let { user, pwd, url } = JSON.parse(data);

        const browser = await pupperteer.launch({
            headless: false,
            defaultViewport: null,
            slowMo: 50,
            args: ["--start-maximized", "--disable-notifications"]
        });

        let tabs = await browser.pages();
        let tab = tabs[0];

        await tab.goto(url, { waitUntil: "networkidle2" });

        await tab.type("#login-username", user, { delay: 30 })
        await tab.type("#login-password", pwd, { delay: 30 })

        await Promise.all([
            tab.click("#login-button"),
            tab.waitForNavigation({ waitUntil: "networkidle2" })
        ])

        for (let i = 0; i < albums.length; i++) {
            
            await tab.waitForSelector("a[aria-label = Search]")
            await Promise.all([
                tab.click("a[aria-label = Search]"),
                tab.waitForNavigation({ waitUntil: "networkidle2" })
            ])
            // Search Album
            await tab.type("input[data-testid=search-input]", albums[i]["name"], { delay: 30 })
            //Waiting for search-result element
            await tab.waitForSelector("._6fa24354481d72595112420e92058ad2-scss a")
            //selecting search-result element
            let albumAnchor = await tab.$("._6fa24354481d72595112420e92058ad2-scss a");
            //Getting link to album
            let href = await tab.evaluate(function (el) {
                return el.getAttribute("href")
            }, albumAnchor)
            let albumLink = "https://open.spotify.com" + href;
            let newTab = await browser.newPage()
            await handleAlbum(newTab, albumLink);
            await tab.click("._6a754dee03dc3503edc53e44d567f316-scss")
        }
        //Writing songs to a file
        const jsonContent = JSON.stringify(SongArr);
        fs.writeFile("./songs.json", jsonContent, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        tab.close();
    } catch (err) {
        console.log(err);
    }
})()

async function handleAlbum(newTab, albumLink) {
    try {
        // Opening new tab
        await newTab.goto(albumLink, { waitUntil: "networkidle2" });
        //  Waiting for save to library button
        await newTab.waitForSelector(".a8cc695b476965309a30d01880d6cb01-scss")
        // Clicking save to library button
        await newTab.click(".a8cc695b476965309a30d01880d6cb01-scss")
        //Waiting for song-list elements
        await newTab.waitForSelector(".tracklist li .tracklist-name.ellipsis-one-line")
        // Scrapping song-names from song-list elements
        let elemts = await newTab.$$(".tracklist li .tracklist-name.ellipsis-one-line")
        for (let i = 0; i < elemts.length; i++) {
            let sName = await newTab.evaluate(function (el) {
                return el.innerText;
            }, elemts[i])
            SongArr.push(sName);
        }

        //Closing tabs
        await newTab.close();
    } catch (err) {
        console.log(err);
    }
}

