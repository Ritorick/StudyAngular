const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        webPreferences: {
            contextIsolation: true
        }
    });

    mainWindow.loadFile(
        path.join(__dirname, '../dist/hello-world-app/browser/index.html')
    );

    // Angularの読み込みが完了したらメイン画面を表示
    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.show();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
