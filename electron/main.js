const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

function startServer() {
  const serverPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'server', 'index.js');

  console.log('Starting server:', serverPath);

  serverProcess = spawn(process.execPath, [serverPath], {
    cwd: path.dirname(serverPath),
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1'
    },
    windowsHide: true
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`SERVER: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`SERVER ERROR: ${data}`);
  });

  serverProcess.on('error', (error) => {
    console.error('SERVER PROCESS ERROR:', error);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const frontendPath = path.join(
    process.resourcesPath,
    'app.asar',
    'client',
    'dist',
    'client',
    'browser',
    'index.html'
  );

  console.log('Frontend:', frontendPath);

  mainWindow.loadFile(frontendPath);
}

app.whenReady().then(() => {
  startServer();

  setTimeout(() => {
    createWindow();
  }, 2000);
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});