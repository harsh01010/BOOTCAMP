// var x =  document.querySelector("p.main")
// x.innerHTML = "JAVASCRIPT"

var x = document.querySelectorAll("p")
x[1].innerHTML = "Tree Of HTML"
x[0].innerHTML = "LEARN"

var y = document.querySelector("a")
y.href = "https://www.google.com/"
y.style.textDecoration = "none"
y.style.color = "#f0f0f0"
x[0].style.color = "#0074d9"
x[1].style.fontWeight = 'bold'
x[1].style.color = "#0074d9"

var z = document.createElement("h1")
var txt = document.createTextNode("JAVASCRIPT")
z.appendChild(txt)

let box = document.querySelector(".flex-container")
//box.appendChild(z)
let child = document.querySelector(".container")
box.insertBefore(z,child)

let newELE = document.createElement("p")
newELE.innerHTML = "hello world"

box.appendChild(newELE);
box.removeChild(newELE);

// parentElement.replaceChild(newElement, oldElement)