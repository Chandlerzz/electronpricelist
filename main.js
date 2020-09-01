const { app, globalShortcut, Menu, Tray } = require('electron')
const { Setting, Search,SendEmail } = require('./windows/index.js')
const path = require('path')
const fs = require('fs')
const util = require('util')
const writeFilePromise = util.promisify(fs.writeFile)
const isDev = require('electron-is-dev')
let config1 = path.join(path.dirname(process.execPath), './config1.json')
if (isDev) {
  config1 = './config1.json'
}
// 默认配置

let defaultConfig1 = {"items":[{"name":"ideal-heater","type":"heater","price":"$5.5","certs":"CE Rohs FCC","materials":"","moq":"5000pcs","image":"idealHeater.jpg","model":"TV18-073","specification":{"specOne":"built-in 12-hour programmable timer","specTwo":"Adjustable temperature from 15°c to 32°c","specThree":"high quality materials, safe and durable.","specFour":"wide-angle wide-angle heating","specFive":" Remote control operation","specSix":"undefined"},"packageTerms":{"outerBoxSize":"12 × 12.3 × 18.5cm","innerBOxSize":"25 × 37.8× 39cm","amount":"24pcs / carton"},"youtube":""},{"name":"deluxe-heater","type":"heater","price":"$10.55","certs":"CE Rohs","materials":"","moq":"5000pcs","image":"deluxeHeater.jpg","model":"TV19-001","specification":{"specOne":"built-in 12-hour programmable timer","specTwo":"Adjustable temperature from 15°c to 32°c","specThree":"high quality materials, safe and durable.","specFour":"wide-angle wide-angle heating","specFive":" Remote control operation","specSix":"undefined"},"packageTerms":{"outerBoxSize":"12 × 12.3 × 18.5cm","innerBOxSize":"25 × 37.8× 39cm","amount":"24pcs / carton"},"youtube":""},{"name":"wonder-heater","type":"heater","price":"$5.3","certs":"CE Rohs","materials":"1","moq":"5000pcs","image":"wonderHeater.png","model":"default","specification":{"specOne":"built-in 12-hour programmable timer","specTwo":"Adjustable temperature from 15°c to 32°c","specThree":"high quality materials, safe and durable.","specFour":"wide-angle wide-angle heating","specFive":" Remote control operation","specSix":"undefined"},"packageTerms":{"outerBoxSize":" 48 × 47 × 42cm","innerBOxSize":"14.7 × 11.5 × 20cm","amount":"24pcs / carton"}},{"name":"flame-heater","type":"heater","price":"$6.8","certs":"CE Rohs","materials":"","moq":"5000pcs","image":"flameHeater.jpg","model":"TV18-066","specification":{"specOne":"built-in 12-hour programmable timer","specTwo":"Adjustable temperature from 15°c to 32°c","specThree":"high quality materials, safe and durable.","specFour":"wide-angle wide-angle heating","specFive":" Remote control operation","specSix":"undefined"},"packageTerms":{"outerBoxSize":"12 × 12.3 × 18.5cm","innerBOxSize":"25 × 37.8× 39cm","amount":"12pcs / carton"}},{"name":"mosquito-lamp","type":"other","price":"$4.75","certs":"CE Rohs","materials":"ABS","moq":"5000pcs","image":"mosquitoLamp.png","model":"TVM-001","specification":{"specOne":"Adjustable 3-speed quiet fan,low, medium and high","specTwo":"The Mosquito Trap is kid safe, chemical-free, and pet-friendly.","specThree":"Fight mosquitoes and other flying insects easily with this mosquito insect catcher","specFour":"easy to clean - no more messy clean up","specFive":"","specSix":"undefined"},"packageTerms":{"outerBoxSize":"","innerBOxSize":"","amount":""}},{"name":"handy-heater","type":"heater","price":"$5.6","certs":"CE Rohs","materials":"","moq":"5000pcs","image":"handyHeater.jpg","model":"TV17-015","specification":{"specOne":" adjustable thermostat from 15 ℃ to 32.c℃, Auto Shut-off and swich on when if reach target temperature.","specTwo":"12-hour programmable timer","specThree":" digital LED display","specFour":"Power : 400 Watts","specFive":"Whisper-Quiet Operation","specSix":"undefined"},"packageTerms":{"outerBoxSize":"25 × 37.8× 39cm","innerBOxSize":"14.7 × 11.5 × 20cm","amount":"24pcs / carton"}},{"name":"personal-heater","type":"heater","price":"$5.3","certs":"CE Rohs","materials":"","moq":"5000pcs","image":"personalHeater.png","model":"TV18-068","specification":{"specOne":"12-hour programmable timer","specTwo":"Power : 400 Watts","specThree":"High & low Speed settings","specFour":" Build-in safety features auto shut down with circuit protection","specFive":"the wall-outlet space heater","specSix":""},"packageTerms":{"outerBoxSize":"","innerBOxSize":"","amount":""}},{"name":"air-chiller","type":"cooler","price":"$5.2","certs":"CE Rohs","materials":"ABS","moq":"5000pcs","image":"airChiller.png","model":"TVL19002","specification":{"specOne":"Adjustable 3-speed quiet fan,low, medium and high","specTwo":"Fast-Hydro Cooling Technology","specThree":"1.  Washable Sponge Filter 2.  ","specFour":"Adjustable air vents, Evaporate Air Filter, Cools, Humidifies & Purifies Air. ","specFive":"7 digital therapy Led lighting control make your sleeping comfortable.","specSix":"undefined"},"packageTerms":{"outerBoxSize":"","innerBOxSize":"","amount":""}},{"name":"wonder-cooler","type":"cooler","price":"$5.8","certs":"CE Rohs","materials":"ABS","moq":"5000pcs","image":"wonderCooler.png","model":"TV18-001","specification":{"specOne":"Adjustable 3-speed quiet fan,low, medium and high","specTwo":"Fast-Hydro Cooling Technology","specThree":"Washable Sponge Filter","specFour":"Adjustable air vents, Evaporate Air Filter, Cools, Humidifies & Purifies Air. ","specFive":"7 digital therapy Led lighting ","specSix":"undefined"},"packageTerms":{"outerBoxSize":"53×34 ×  47cm","innerBOxSize":"17X17X22.5cm","amount":"12pcs / carton"}},{"name":"round-cooler","type":"cooler","price":"$5.55","certs":"CE Rohs","materials":"ABS","moq":"5000pcs","image":"roundCooler.jpg","model":"TV20-001","specification":{"specOne":"Adjustable 3-speed quiet fan,low, medium and high","specTwo":"Fast-Hydro Cooling Technology","specThree":"Washable Sponge Filter","specFour":"7 digital therapy Led lighting","specFive":"Adjustable air vents, Evaporate Air Filter, Cools, Humidifies & Purifies Air. ","specSix":"undefined"},"packageTerms":{"outerBoxSize":"","innerBOxSize":"","amount":""}},{"name":"ultra-cooler","type":"cooler","price":"$5.3","certs":"CE Rohs","materials":"ABS","moq":"5000pcs","image":"ultraCooler.jpg","model":"TV19-005","specification":{"specOne":"Adjustable 3-speed quiet fan,low, medium and high","specTwo":"Fast-Hydro Cooling Technology","specThree":"Washable Sponge Filter","specFour":"7 digital therapy Led lighting","specFive":"Adjustable air vents, Evaporate Air Filter, Cools, Humidifies & Purifies Air. ","specSix":"undefined"},"packageTerms":{"outerBoxSize":"","innerBOxSize":"","amount":""},"youtube":"https://www.youtube.com/watch?v=jFDIM8YoTLM"},{"name":"massage-gun","type":"other","price":"$13.5","certs":"CE Rohs FCC","materials":"","moq":"3000pxs","image":"massageGun.jpg","model":"TVJ20-001","specification":{"specOne":"Rechargeable Cordless Impact Massage Gun","specTwo":"6 Power Level For Selection","specThree":"Helps Relieve Muscle Soreness And Stiffness","specFour":"Improves Range Of Motion","specFive":"Promotes Blood Circulation","specSix":"Powerful High-torque Motor"},"packageTerms":{"outerBoxSize":"","innerBOxSize":"","amount":""}},{"name":"lint-remover","type":"other","price":"$1.7","certs":"Rohs","materials":"ABS","moq":"5000pxs","image":"lintRemover.png","model":"TV17-003","youtube":"https://www.youtube.com/watch?v=JL1tdJotvRs&t=195s","specification":{"specOne":"FREE TRAVEL SIZE BRUSH","specTwo":"EXTRA LARGE & DOUBLE SIDED","specThree":"SELF CLEANING BASE","specFour":"REUSABLE & ECO-FRIENDLY","specFive":"A PET OWNERS DREAM","specSix":"undefined"},"packageTerms":{"outerBoxSize":"","innerBOxSize":"","amount":""}}],"adviseItem":"ideal-heater"}

class WSearch {
  constructor() {
  }
  /* 打开设置页面 */
  openSettingWindow() {
    new Setting({ width: 800, height: 800, show: false, backgroundColor: '#21252B' }, 'renderer/setting/setting.html')
  }
  /* 打开搜索页面 */
  openSearchWindow() {
    this.search = new Search({
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
        javascript: true,
      },
      width: 1000, height: 600, show: false }, 'renderer/priceList/home/home.html')
    }
    /* 打开搜索页面 */
    openSendEmailWindow(){
      this.SendEmail =new SendEmail({ width: 240, height: 600, show: true,transparent:true,}, 'renderer/sendEmail/sendEmail.html')
    }
    /* 注册快捷键 */
    setShortcut() {
      /* Alt + s: 打开搜索面板 */
      globalShortcut.register('Alt + s', () => {
        if (!this.search || !this.search.ins) {
          this.openSearchWindow()
        } else {
          // this.search.close()
          // this.search = null
        }
      })
      globalShortcut.register('Alt + d', () => {
        if (!this.sendEmail || !this.sendEmail.ins) {
          this.openSendEmailWindow()
        } else {
          // this.search.close()
          // this.search = null
        }
      })
    }
    /* 创建系统托盘 */
    setTray() {
      this.tray = new Tray(path.join(__dirname, './assets/imgs/qqq.jpg'))
      const contextMenu = Menu.buildFromTemplate([
        {
          label: '设置',
          click: this.openSettingWindow
        },
        {
          label: '退出',
          click: function () {
            app.quit()
          }
        }
      ])
      this.tray.setToolTip('call me')
      this.tray.setContextMenu(contextMenu)
    }
    /* 检查是否有配置文件,如果没有就生成一个 */
    async checkConfigOrInit1() {
      let hasConfig = fs.existsSync(config1)
      if (!hasConfig) {
        await writeFilePromise(config1, JSON.stringify(defaultConfig1))
      }
    }
    /* 创建窗口 */
    async createWindow() {
      await this.checkConfigOrInit1()
      this.setTray()
      this.setShortcut()
    }
    /* 初始化 */
    init() {
      app.on('ready', () => { this.createWindow() })
      app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
        }
      })

      app.on('activate', () => {
        if (settingWindow === null) {
          this.createWindow()
        }
      })
    }
  }


  new WSearch().init()
