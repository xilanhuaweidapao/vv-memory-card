"use strict";

import electron, {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  powerMonitor
} from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";
const path = require("path");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, timer;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  // 获取屏幕宽高
  const { width } = electron.screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: 800,
    height: 500,
    x: width - 800,
    y: 0,
    webPreferences: {
      nodeIntegration: true, //集成node
      // 设置为false才可以请求数据
      webSecurity: false
    },
    frame: false,
    skipTaskbar: true // 是否在任务栏显示窗口
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray;
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  tray = new Tray(path.join(__static, "icon.ico"));
  // 点击托盘图标控制应用显隐
  tray.on("click", function() {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "关闭应用",
      type: "normal",
      click: function(menuItem, browserWindow, event) {
        app.quit();
      }
    }
  ]);
  tray.setToolTip("vv-记忆卡片");
  tray.setContextMenu(contextMenu);
  createWindow();
  // 获取系统的空闲状态 active idle
  watchIdle();
});
// 监听无操作状态进行全屏
function watchIdle() {
  clearInterval(timer);
  timer = setInterval(() => {
    // console.log(powerMonitor.getSystemIdleState(10));
    if (powerMonitor.getSystemIdleState(10) === "idle") {
      win.setFullScreen(true);
      clearInterval(timer);
      timer = setInterval(() => {
        if (powerMonitor.getSystemIdleState(10) === "active") {
          win.setFullScreen(false);
          watchIdle();
        }
      }, 1000);
    }
  }, 4000);
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
