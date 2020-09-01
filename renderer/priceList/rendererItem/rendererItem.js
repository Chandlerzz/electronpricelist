const fs = require('fs')
const path = require("path")
const util = require('util')
const writeFilePromise = util.promisify(fs.writeFile)
const readFilePromise = util.promisify(fs.readFile)
const $ = require("jquery");
const isDev = require('electron-is-dev')
let config = path.join(path.dirname(process.execPath),'./config1.json')
let rendererConfig = path.join(path.dirname(process.execPath), './redererConfig.json')
if (isDev) {
  rendererConfig='./rendererConfig.json'
}
if (isDev) {
  config = './config1.json'
}
function renderList(itemData,type) {
  let lists = ''
  itemData.items.forEach(item => {

    lists += `<li><input class="items" type="checkbox" name=${item.type} value=${item.name}> <a href="#" onclick="adviseItem(this)">${item.name}</a></li>`
  })
  $('.'+type).html(lists)
}
function adviseItem(event){

  let checkedData2String = ""
  console.log(event.innerText)
  rendererData.adviseItem=event.innerText
  checkedData2String = JSON.stringify(rendererData)
  fs.writeFileSync(rendererConfig,checkedData2String)
  window.location.href="../adviseRendererItem/adviseRendererItem.html"
}

function rendererItems(){
  window.location.href="../pricelist/pricelist.html"
}
async function main(){
  let data = await readFilePromise(rendererConfig)
  rendererData = JSON.parse(data.toString())
  let data1 = await readFilePromise(config)
  itemData = JSON.parse(data1.toString())
  renderList(rendererData,"rendererItem")
}
main()
