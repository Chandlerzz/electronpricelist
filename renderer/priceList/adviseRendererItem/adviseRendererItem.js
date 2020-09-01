const util = require('util')
const fs =require("fs")
const path = require("path")
const isDev = require('electron-is-dev')
const writeFilePromise = util.promisify(fs.writeFile)
const readFilePromise = util.promisify(fs.readFile)
let config = path.join(path.dirname(process.execPath),'./config1.json')
let rendererConfig = path.join(path.dirname(process.execPath), './redererConfig.json')
if (isDev) {
  rendererConfig='./rendererConfig.json'
}
if (isDev) {
  config = './config1.json'
}
// bellowing is input element
const name =document.getElementById("name")
const type =document.getElementById("type")
const price =document.getElementById("price")
const certs =document.getElementById("certs")
const materials =document.getElementById("materials")
const moq =document.getElementById("moq")
const image =document.getElementById("image")
const model =document.getElementById("model")
const youtube = document.getElementById("youtube")
const specOne =document.getElementById("specOne")
const specTwo =document.getElementById("specTwo")
const specThree =document.getElementById("specThree")
const specFour =document.getElementById("specFour")
const specSix =document.getElementById("specSix")
const outerBoxSize =document.getElementById("outerBoxSize")
const innerBOxSize =document.getElementById("innerBOxSize")
const amnout = document.getElementById("amount")
// bellowing is buttom element
const reset = document.getElementById('reset')
const submit = document.getElementById('submit')
const advise = document.getElementById('advise')
// belloing is all input elements
const inputs = document.getElementsByTagName("input")
let allItems = {}
let config1 = path.join(path.dirname(process.execPath), './config1.json')
if (isDev) {
  config1 = './config1.json'
}
// inputReset is the function for reset the input
function inputReset(){
reset.addEventListener('click',function(){

    var inputss = [...inputs]
    console.log(typeof(inputss))
    inputss.forEach((input)=>{

      input.value = ""})
})}
//adviseItem will be render in HTML
function adviseItemRenderer(allItems){

  allItems.items.forEach((item)=>{
      if (item.name == allItems.adviseItem){
        name.value = item.name
        type.value =item.type
        price.value = item.price
        certs.value = item.certs
        materials.value = item.materials
        moq.value = item.moq
        image.value = item.image
        model.value =item.model
        youtube.value = item.youtube
        specOne.value =item.specification.specOne
        specTwo.value = item.specification.specTwo
        specThree.value = item.specification.specThree
        specFour.value = item.specification.specFour
        specFive.value = item.specification.specFive
        specSix.value = item.specification.specSi
        outerBoxSize.value = item.packageTerms.outerBoxSize
        innerBOxSize.value = item.packageTerms.innerBOxSize
        amount.value = item.packageTerms.amount
            }
      })
}
function adviseItemSubmit(allItems){
  advise.addEventListener("click",function(){
    allItems.items.forEach((item, i) => {
      if (item.name == allItems.adviseItem){
        item.name = name.value
        item.type = type.value
        item.price= price.value
        item.certs = certs.value
        item.materials  = materials.value
        item.moq = moq.value
        item.image = image.value
        item.youtube=youtube.value
        item.specification.specOne = specOne.value
        item.specification.specTwo = specTwo.value
        item.specification.specThree = specThree.value
        item.specification.specFour = specFour.value
        item.specification.specFive = specFive.value
        item.specification.specSix = specSix.value
        item.packageTerms.outerBoxSize = outerBoxSize.value
        item.packageTerms.innerBOxSize = innerBOxSize.value
        item.packageTerms.amount =amount.value
      }
    });
    let json = JSON.stringify(allItems)
    let err = fs.writeFileSync(rendererConfig, json)
    if (err) {
      console.log(err)
      return
    }
    alert('保存成功')
    window.location.href="../rendererItem/rendererItem.html"
  })

  }






async function main(){
  let data = await readFilePromise(rendererConfig)
  rendererData = JSON.parse(data.toString())
  inputReset()
  adviseItemRenderer(rendererData)
  adviseItemSubmit(rendererData)
}

main()
