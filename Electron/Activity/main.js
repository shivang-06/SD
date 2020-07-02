/* Method to run Electron code : -- 
 => npm init -y
 => npm install electron --save-dev
 => create main.js
 => in package.json
    -> add "main": "main.js"
    -> in "scripts" add : "start": "electron ."

run code :- npm start
*/
const electron = require("electron"); //initialise electron variable
const app =  electron.app;
const ejs = require("ejs-electron")
ejs.data({
  "title": "My Excel",
  "rows": 100,
  "cols":26
})
function createWindow(){
    // Create the browser window.
    const win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        show: false, //so when app is loaded it is not visible at start and only visible when maximized.
        webPreferences: {
            nodeIntegration: true
        }
    })
    // and load the index.html of the app.
    win.loadFile('index.html').then(function(){
        console.log("App loaded successfully");
        win.maximize(); 
        win.show();
        win.webContents.openDevTools();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })