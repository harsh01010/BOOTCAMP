let arr = ["./images/dice1.png",`./images/dice2.png`,`./images/dice3.png`,`./images/dice4.png`,`./images/dice5.png`,`./images/dice6.png`]
let x1 = Math.random();
x1 *= 6;
x1 = Math.floor(x1);

let x2 = Math.random();
x2 *= 6;
x2 = Math.floor(x2);
if(x1>x2)
    document.querySelector("h1").innerHTML = "Player1 Won"
else if(x1<x2)
    document.querySelector("h1").innerHTML = "Player2 Won"
else
    document.querySelector("h1").innerHTML = `It's A Draw`

let dice1 =document.querySelector(".img1");
let dice2 = document.querySelector(".img2");
dice1.src = arr[x1];
dice2.src = arr[x2];


