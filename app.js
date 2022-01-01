const {app, BrowserWindow} = require('electron');
const config = require('./config.json');

let window = null;

app.once('ready', () => {
  window = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    icon: __dirname + 'img/logo.png',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  window.webContents.session
    .setProxy({proxyRules: config.proxy})
    .then(
      () => {
        window.loadURL('https://vk.com/');
      }
    )
    .catch((err) => console.error(err));

  window.once('ready-to-show', () => {
    window.show();
  });
});

app.on('login', (event, webContents, details, authInfo, callback) => {
  console.log("Loading proxy login...");
  event.preventDefault();
  callback(config.proxyLogin, config.proxyPass);
  console.log("Proxy loaded. Starting window.");
});