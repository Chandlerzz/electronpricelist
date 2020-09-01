const { BrowserWindow, Menu} = require('electron')
const {dialog} = require("electron")
const XLSX = require('xlsx')
let options = {
 // See place holder 1 in above image
 title : "Custom title bar",

 // See place holder 2 in above image
 defaultPath : "D:\\electron-app",

 // See place holder 3 in above image
 buttonLabel : "Custom button",

 // See place holder 4 in above image
 filters :[
  {name: 'excel', extensions: ['xlsx', 'xls']},
  {name: 'Images', extensions: ['jpg', 'png', 'gif']},
  {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
  {name: 'Custom File Type', extensions: ['as']},
  {name: 'All Files', extensions: ['*']}
 ],
 properties: ['openFile','multiSelections']
}
/* 主窗口 */
class MainWindow {
  constructor(option, path) {
    this.window = new BrowserWindow(option)
    this.window.loadFile(path)
    this.setTopMenu()
  }
  /* 设置顶部菜单 */
  setTopMenu() {
    let menu = Menu.buildFromTemplate([
      {
        label: '开发者工具',
        click: () => {
          this.window && this.window.webContents.openDevTools()
        }
      },
      {
        label: '文件',
        submenu: [
        {
          label: '打开文件',
          accelerator: 'Shift+CmdOrCtrl+O',
          click() {
            dialog.showOpenDialog( options,(filePaths) => {
            console.log(filePaths[0])
            const workBook = XLSX.readFile(filePaths[0])
            const sheetNames = workBook.SheetNames
            console.log(sheetNames)
            const workSheet = workBook.Sheets[sheetNames[0]]
            var JSON = XLSX.utils.sheet_to_json(workSheet)
            console.log(JSON)
})
          }
        }
      ]
        // click: () => {
        //   this.window && this.window.webContents.openDevTools()
        // }
      }
    ])
    Menu.setApplicationMenu(menu)
  }
}

/* 设置页面 */
class Setting extends MainWindow {
  constructor(option, path) {
    super(option, path)
    /* 窗口关闭事件 */
    this.window.on('closed', () => {
      this.window = null
    })
    this.window.once('ready-to-show', () => {
      this.window.show()
    })
  }
}


/* 搜索页面 */
class Search extends MainWindow {
  constructor(option, path) {
    super(option, path)
    this.ins = true
    this.window.once('ready-to-show', () => {
      this.window.show()
    })
    /* 窗口关闭事件 */
    this.window.on('closed', () => {
      this.close()
      this.ins = false
    })
    /* 失去焦点自动关闭 */

  }
  close() {
    this.window.destroy()
    this.window = null
  }
}
class SendEmail extends MainWindow {
    constructor(option, path) {
      super(option, path)
      this.ins = true
      this.window.once('ready-to-show', () => {
      this.window.show()
      })
      /* 窗口关闭事件 */
      this.window.on('closed', () => {
      this.close()
      this.ins = false
      })
      /* 失去焦点自动关闭 */
      // this.window.on('blur', () => {
      //   this.close()
      //   this.ins = false
      // })
    }
    close() {
      this.window.destroy()
      this.window = null
    }
  }




module.exports = {
  Setting,
  Search,
  SendEmail,
}
