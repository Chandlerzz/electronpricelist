const adviseItem = document.getElementById("adviseItem")
const selectItem = document.getElementById("selectItem")
const newItem= document.getElementById("newItem")
const html2pdf = document.getElementById("html2pdf")
const TabGroup = require("electron-tabs")
const puppeteer = require('puppeteer');
let tabGroup = new TabGroup({
  newTab: {
    title: 'New Tab',
    src: 'https:www.google.com',
    webviewAttributes:{nodeintegration:true},
  }
});

tabGroup.addTab({
  title: 'Google',
  src: 'https://www.google.com',
  webviewAttributes:{nodeintegration:true},
});

tabGroup.addTab({
  title: "home",
  src: "https://www.google.com",
  visible: true,
  active: true,
  webviewAttributes:{nodeintegration:true},

});


  newItem.addEventListener("click",function(event){
  event.preventDefault();

  var tab = tabGroup.getActiveTab()
  console.log(tab)
  let webview = tab.webview;
  console.log(webview);
  webview.loadURL("file:C:\\Users\\Administrator\\Desktop\\node\\search\\renderer\\priceList\\newItem\\newItem.html");
  console.log(webview)
})

selectItem.addEventListener("click", function(event){
  event.preventDefault()
  var tab =tabGroup.getActiveTab()
  let webview =tab.webview;
  webview.loadURL("file:C:\\Users\\Administrator\\Desktop\\node\\search\\renderer\\priceList\\selectItem\\selectItem.html")
})

adviseItem.addEventListener("click",function(event){
  event.preventDefault()
  var tab=tabGroup.getActiveTab()
  let webview =tab.webview;
  webview.loadURL("file:C:\\Users\\Administrator\\Desktop\\node\\search\\renderer\\priceList\\adviseItem\\adviseItem.html")
})

async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("file:C:\\Users\\Administrator\\Desktop\\node\\search\\renderer\\priceList\\priceList\\priceList.html");
     await page.pdf({path: 'baidu.pdf', format: 'A4'});

    await browser.close();
}
