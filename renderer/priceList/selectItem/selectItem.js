const fs = require('fs')
const path = require("path")
const util = require('util')
const writeFilePromise = util.promisify(fs.writeFile)
const readFilePromise = util.promisify(fs.readFile)
const $ = require("jquery");
const isDev = require('electron-is-dev')
const Sortable = require('sortablejs')
let config = path.join(path.dirname(process.execPath),'./config1.json')
let rendererConfig = path.join(path.dirname(process.execPath), './redererConfig.json')
if (isDev) {
  rendererConfig='./rendererConfig.json'
}
if (isDev) {
  config = './config1.json'
}
function renderList(itemData,type,drag) {
  let lists = ''
  itemData.items.forEach(item => {
    if (item.type ===type)
    {lists += `<li> <b class=${drag}>☰</b><input class="items" type="checkbox" name=${item.type} value=${item.name}> <a href="#" onclick="adviseItem(this)">${item.name}</a></li>`
  }})
  $('.'+type).html(lists)
}
var block = document.getElementById(block);

function toggle(source,foo) {
  checkboxes = document.getElementsByName(foo);
  // console.log(checkboxes);
  checkboxes.forEach((checkbox)=>{
    checkbox.checked = source.checked
  })
}
// source.checked ? $("#block").show(1000) : $("#block").hide(1000);
function hideShow(source,block){
  source.checked ? $("#"+block).show(500) : $("#"+block).hide(1000);
}

function submitItems(){
  let checkedData2String = ""
  var checkedData={items:[]}
  var checkedItems = document.getElementsByClassName('items')
  // console.log(checkedItems)
  Array.from(checkedItems).forEach((checkedItem)=>{
    console.log(checkedItem.checked);
    console.log(checkedItem.value);
    if (checkedItem.checked ===true){
    meta=itemData.items.filter
    ((item)=>item.name.trim()===checkedItem.value)

    checkedData.items.push(meta[0])
  }
    checkedData2String = JSON.stringify(checkedData)
    console.log(checkedData2String);
    fs.writeFileSync(rendererConfig,checkedData2String)
  })
  window.location.href="../rendererItem/rendererItem.html"

}

function adviseItem(event){

  let checkedData2String = ""
  console.log(event.innerText)
  itemData.adviseItem=event.innerText
  console.log(itemData)
  checkedData2String = JSON.stringify(itemData)
  fs.writeFileSync(config,checkedData2String)
  window.location.href="../adviseItem/adviseItem.html"
}
function sortable(el,drag){
  let block = document.getElementById(el);
  let sortable = Sortable.create(block,
    {
      handle: '.'+drag,
      animation: 150
    });
}
function sortSubmit(){
  let checkedData2String = ""
  var checkedData={items:[]}
  var checkedItems = document.getElementsByClassName('items')
  // console.log(itemData)

  Array.from(checkedItems).forEach((checkedItem)=>{

    meta = itemData.items.filter((item)=>item.name.trim()===checkedItem.value)
    checkedData.items.push(meta[0])
    // console.log(checkedData);
  })
  itemData.items = checkedData.items
  itemData = JSON.stringify(itemData)
  console.log(itemData);
  fs.writeFileSync(config,itemData)
}

async function main() {
  let data = await readFilePromise(config)
  itemData = JSON.parse(data.toString())

  renderList(itemData,'heater','drag-handle1')
  renderList(itemData,'cooler','drag-handle2')
  renderList(itemData,'mirror','drag-handle3')
  renderList(itemData,'other','drag-handle4')
  // eventBinding()
  sortable("block1","drag-handle1")
  sortable("block2","drag-handle2")
  sortable("block3","drag-handle3")
  sortable("block4","drag-handle4")

}
main()
