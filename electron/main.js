const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
} = require('electron');

let mainWindow;

Menu.setApplicationMenu(null);

app.on('ready', () => {
  globalShortcut.register('Escape', function(){
    mainWindow.close();
  });

  mainWindow = new BrowserWindow({
    frame: true,
    resizable: false,
    transparent: false,
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.center();
  mainWindow.setMenu(null);
  mainWindow.setFullScreen(false);
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});

app.on('will-quit', function(){
  globalShortcut.unregister('Escape');
  globalShortcut.unregisterAll();
});
