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

z.addEventListener("click",function(){
    alert("Learn complete Document Object Model Of HTML:")
});
z.style.cursor = "pointer"


// document.getElementsByTagName() returns array
//   document.querySelector("li a") // selects a inside the li
//  document.getElementById("id")
// when multiple items matches same selector then we get the first element.
// adding classes and ids using js
// document.querySelector("button").classList.add("new-class") or .remove("existing-class") or .toggle("class")

/*
    eventListener('click',func()) -> function wil be called initially
    eventListener('click',func)
    ecentListener('click',function(){
        //anonymous function
    })
*/
/*
higher order functon:
add(num1,num2)
{
    return num1+num2;
}
multiply(num1,num2)
{
    return num1*num2
}

f(num1,num2,calculator)
{
    return calculator(num1,num2)
}

calling: 
    f(3,4,add)
*/

// objects
// var obj1={
//     name:"hello",
//     age:18,
//     class:"high",
//     origin:"europa",
//     x:[3,4,2,2,4,4]
// }
// console.log(obj1)
// console.log(obj1['name'])

/*
function obj1(a,b,c,d,e)
{
    this.name = a;
    this.age = b;
    this.class = c;
    this.origin = d;
    this.x = e;
    this.f = function(){
        alert("hello world!")
    }
}

var x = new obj1("world",44,"low","earth",[0,0,0,0])
console.log(x)
x.f()
*/
/*
switch case 
switch(exp){
    case exp:
        exp
        break
    case exp:
        exp
        break
}
*/

// key events
document.addEventListener("keydown",function(event){
    console.log(event)
});
// keyup trigers when we leave the key after pressing
// keydown trigers when we press down the key.