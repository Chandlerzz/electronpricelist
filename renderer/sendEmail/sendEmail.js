const { shell } = require('electron')
 const $ = require("jquery")
const path = require("path")
const fs = require("fs")
const search  = document.getElementById('search')
const matchlist  = document.getElementById('match-list')
console.log(shell);
function eventBinding(){
  $('.input').focus()
  // const shortcut = $(".shortcut")
  // shortcut.on("click",function(){
  //     let query = $('.input').val()
  //     const base = "C:\\Users\\Administrator\\Desktop\\软件快捷键"
  //     var fullpath = path.join(base,query)
  //     shell.openItem(fullpath)
  // })
  $(document).keyup(function(e){
    const base = "C:\\Users\\Administrator\\Desktop\\软件快捷键"
    var key = e.which;
    if(key==13){
      /*Do something. 调用一些方法*/
      let query = $('.input').val()
      var fullpath = path.join(base,query)
      console.log(fullpath)
      shell.openItem(fullpath)
    }
  });
}
function wordHint(search){
  const base = "C:\\Users\\Administrator\\Desktop\\软件快捷键"
  var files = fs.readdirSync(base)
  var items = files
    .map(file=>file.split("."))
    .map((file)=>({name:file[0],type:file[1]}))

  const searchStates =async searchText =>{
    let matches =items.filter(
      file =>{
        const regex = new RegExp(searchText,"gi")
        return file.name.match(regex)
      }
    );
  if (searchText.length===0)
  {
    matches=[]
    matchlist.innerHTML = ""
  }
  outputHTML(matches)
  }

  const outputHTML = matches =>{
    if (matches.length>0){
      const html = matches.map((match,i) =>
  `<div class="card bg-secondary text-white">
   <div class="card-body"><input type="checkbox" onchange="AsyncSelection(this)" name="a" id="selection${i}" value="${match.name}" /><label class="label label-default" for="selection${i}">${match.name}</label></br>
   </div></div>`)
    .join("")
    console.log(search.value)
    matchlist.innerHTML = html
    }
    else {
      matchlist.innerHTML = ""
    }
  }
  search.addEventListener("input",()=>searchStates(search.value))
}

function AsyncSelection(e){
    var searches = document.getElementById("search")
    var matchlist1 = document.getElementById("match-list")
    console.log(matchlist1)
    if (e.checked == true){
      searches.value = e.value
      console.log(searches.value)
      matchlist1.innerHTML=""
    }


  }

function main(){
  eventBinding()
  wordHint(search)
  // AsyncSelection()

}
main()
