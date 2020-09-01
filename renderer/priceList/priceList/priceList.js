const fs = require('fs')
const path = require("path")
const util = require('util')
const writeFilePromise = util.promisify(fs.writeFile)
const readFilePromise = util.promisify(fs.readFile)
const $ = require("jquery");
const isDev = require('electron-is-dev')
const Sortable = require('sortablejs')
const puppeteer = require("puppeteer")

let rendererConfig = path.join(path.dirname(process.execPath), './redererConfig.json')
if (isDev) {
  rendererConfig='./rendererConfig.json'
}
function renderList(itemData,type) {
  let lists = ''
  itemData.items.forEach((item,i) => {
    console.log(Number.isInteger(i/4));
    if (Number.isInteger(i/4))
    {
      if (i==0){lists+=`<div class="header">
        <div><span><strong>QIANQIANSHOW HOUSEHOLD & </strong></span>
        <span><strong>JIEJIA IMP & EXP</strong></span>
        <span> established in <small>1999</small></span></div>

        <div ><span>professional & reliable &nbsp&nbsp chandler: sales09@nbjiejia.net</span> </div>
        <div> </div>
      </div>`}
      else
      {
        lists+=`<div class="blank"></div>
      <div class="header">
        <div><span><strong>QIANQIANSHOW HOUSEHOLD & </strong></span>
        <span><strong>JIEJIA IMP & EXP</strong></span>
        <span> established in <small>1999</small></span></div>

        <div ><span>professional & reliable &nbsp&nbsp chandler: sales09@nbjiejia.net</span> </div>
        <div> </div>
      </div>`

      }
    }


    lists += `<div class="wrap">
        <div class="item1">${item.name}<i class="icon-hot"></i></div>
        <div class="item2">

          <img src="./img/${item.image}" alt="" width=200px height=200px>
        </div>
        <div class="item3 wrap-table">
          <div class="spec-item1">
            <p>Model: ${item.model}</p>
          </div>
          <div class="spec-item2">
            <p>Price: ${item.price}</p>
          </div>
          <div class="spec-item3">
            <p>Material: ${item.materials}</p><span></span>
          </div>
          <div class="spec-item4">
            <p>MOQ: ${item.moq}</p>
          </div>
          <div class="spec-item4">
            <p>Package: </p>
          </div>
        </div>
        <div class="item4">
            <p class="specification">${item.specification.specOne}</p>
            <p class="specification">${item.specification.specTwo}</p>
            <p class="specification">${item.specification.specThree}</p>
            <p class="specification">${item.specification.specFour}</p>
            <p class="specification">${item.specification.specFive}</p>
            <p class="specification">${item.specification.specSix}</p>
            <p class="specification">color box: ${item.packageTerms.innerBOxSize}</p>
            <p class="specification">carton box: ${item.packageTerms.outerBoxSize} | ${item.packageTerms.amount}</p>
            <p class="specification youtube">view more in: <a href=${item.youtube} name=${item.youtube}>youtube | ${item.name}</a></p>
        </div>
        </div>
        `
  })
  // console.log(lists);
  $('.'+type).html(lists)
}

function youtubeShowHide(){

  var youtube = document.getElementsByClassName("youtube")
  Array.from(youtube).forEach((item, i) => {
    console.log(item.lastChild.name.length);
    if (item.lastChild.name.length>10){
    item.style.visibility = "visible"
  }
});

}
async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("C:\\Users\\Administrator\\Desktop\\node\\search\\renderer\\priceList\\priceList\\pdf.html",{waitUntil: 'networkidle0'})
    // await page.goto("https://google.com");
    await page.pdf({path: 'pricelist.pdf', printBackground: true, margin: {
                left: '30px',
                top: '15px',
                right: '30px',
                bottom: '15px'
            }})
    // await page.screenshot({type:"jpeg", path: "google.jpeg",fullPage:true,quality:100 });

    await browser.close();
}


async function main() {
  let data = await readFilePromise(rendererConfig)
  itemData = JSON.parse(data.toString())
  renderList(itemData,'main')
  youtubeShowHide()
  var html = "<!DOCTYPE html> <html lang='en'>"+document.head.outerHTML+document.body.outerHTML+"</html>"
  fs.writeFileSync("./renderer/priceList/priceList/pdf.html",html)

  getPic()




}
main()
