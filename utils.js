// for some reason we're using DOM
// this is some hacky garbage

let scale = 0.2

function addSectionSprite(elm,img,row,col,w,h) {
  elm.style.overflow = "hidden"
  elm.style.width = "48px"
  elm.style.height = "48px"
  elm.innerHTML += "<img src="+img+" style='margin-left:"+ -row*w +"px; margin-top:"+ -col*h +"px;'/>";
}
// TODO: w and h
function addSprite(elm,img,w,h) {
  elm.innerHTML += "<img src="+img+" style='width:"+w+"px; height: "+h+"px;'/>"
}


// not very accurate
function convertMs(ms) {
  let days = ms/(1000*60*60*24)
  let hours = (days - Math.floor(days)) * 24
  let mins = (hours - Math.floor(hours)) * 60
  let secs = (mins - Math.floor(mins)) * 60

  return `${Math.floor(days)}d ${Math.floor(hours)}h ${Math.floor(mins)}m ${Math.floor(secs)}s`
}
