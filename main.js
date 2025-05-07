const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800, // Adjust width as needed
    height: 700, // Adjust height as needed to fit your content comfortably
    minWidth: 400, // Optional: set minimum size
    minHeight: 500, // Optional: set minimum size
    // frame: false, // Optional: uncomment for a borderless window
    // transparent: true, // Optional: uncomment for transparency (requires frame: false)
    // alwaysOnTop: true, // Optional: keep the widget always on top
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use a preload script for security
      nodeIntegration: false, // Keep Node.js integration off in the renderer for security
      contextIsolation: true, // Protect against prototype pollution
      enableRemoteModule: false // Disable the remote module (deprecated and less secure)
    }
  });

  // Load the index.html of the app.
  mainWindow.loadFile('index.html'); // Make sure your HTML file is named index.html or update this line

  // Optional: Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
// On macOS, applications and their menu bar typically stay active
// until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process code.
// You can also put them in separate files and require them here.