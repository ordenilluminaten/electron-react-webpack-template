'use strict';

const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

var mainWindow;

// Is dev mode enable
let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath))
  dev = true;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    // Load the index.html of the app
    let indexPath = url.format({
        protocol: 'file:',
        pathname: path.join(__dirname, 'views/index.html'),
        slashes: true
    });
    mainWindow.loadURL( indexPath );

    createMenu();

    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // Open the DevTools automatically if developing
        if (dev)
            mainWindow.webContents.openDevTools();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element
        mainWindow = null;
    });
}

function createMenu(){
    const menuTemplate = [
      {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click(){
                    app.quit();
                }
            }
        ]
      }
    ];
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
      app.quit();
});
  
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open
    if (mainWindow == null)
        createWindow();
});