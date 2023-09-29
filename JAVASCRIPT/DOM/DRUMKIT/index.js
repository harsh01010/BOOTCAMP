let buttons = document.querySelectorAll(".drum")

var sounds =['sounds/tom-1.mp3','sounds/tom-2.mp3','sounds/tom-3.mp3','sounds/tom-4.mp3','sounds/kick-bass.mp3','sounds/snare.mp3','sounds/crash.mp3']

let x = document.querySelector("body")
let keys = ['w','a','s','d','j','k','l']
    for(let i=1;i<=7;i++)
    {
        buttons[i-1].addEventListener('click',function()
        {
            var audio = new Audio(sounds[i-1]);
            audio.play()
        })
    }
        x.addEventListener('keydown',function(event){
            console.log(event.key)
            for(let i=1;i<=7;i++){
            if(event.key === keys[i-1]){
            var audio = new Audio(sounds[i-1]);
            audio.play();
            }
        }
        })