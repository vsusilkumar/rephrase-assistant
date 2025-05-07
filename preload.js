console.log("Preload script started!"); // Add this line

const { contextBridge, clipboard } = require('electron');

console.log("Electron modules required in preload."); // Add this line

contextBridge.exposeInMainWorld('electronAPI', {
  copyToClipboard: (text) => clipboard.writeText(text),
});

console.log("Electron API exposed in preload."); // Add this line