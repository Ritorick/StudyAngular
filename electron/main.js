const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createSplashWindow() {
    splashWindow = new BrowserWindow({
        width: 400,
        height: 250,
        frame: false,
        resizable: false,
        center: true,
        show: false,
        webPreferences: {
            contextIsolation: true
        }
    });

    splashWindow.loadFile(
        path.join(__dirname, 'splash.html')
    );

    splashWindow.once('ready-to-show', () => {
        splashWindow.show();
    });
}

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
        if (splashWindow) {
            splashWindow.close();
            splashWindow = null;
        }

        mainWindow.show();
    });
}

app.whenReady().then(() => {
    createSplashWindow();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createSplashWindow();
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
