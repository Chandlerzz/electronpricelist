const util = require('util')
const fs =require("fs")
const path = require("path")
const isDev = require('electron-is-dev')
const writeFilePromise = util.promisify(fs.writeFile)
const readFilePromise = util.promisify(fs.readFile)
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
// itemSubmit is the funciton for push the data to the config file
async function itemSubmit(){
  let data = await readFilePromise(config1)
  const allItems = JSON.parse(data.toString())
  submit.addEventListener("click",()=>{
    var names = allItems.items.map((item)=>item.name)
    if (names.includes(name.value)){
      alert("please change the name")
    }
    else{
      allItems.items.push(
          {name:name.value,
            type:type.value,
            price:price.value,
          certs:certs.value,
          materials:materials.value,
          moq:moq.value,
          image:image.value,
          model:model.value,
          youtube:youtube.value,
          specification:{
            specOne:specOne.value,
            specTwo:specTwo.value,
            specThree:specThree.value,
            specFour:specFour.value,
            specFive:specFive.value,
            specSix:specSix.value,
          },
          packageTerms:{
            outerBoxSize:outerBoxSize.value,
            innerBOxSize:innerBOxSize.value,
            amount:amount.value,
          }
        }
      )
      let json = JSON.stringify(allItems)
      let err = fs.writeFileSync(config1, json)
      if (err) {
        console.log(err)
        return
      }
      alert('保存成功')
    }
})}


inputReset()
itemSubmit()
