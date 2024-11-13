let canvas;
let world;
let Keyboard = new Keyboard();

function init(){

    canvas = document.getElementById('canvas');
    world = new World(canvas);
    ctx = canvas.getContext('2d');


    character.src= '../img/img/2_character_pepe/2_walk/W-21.png';
    ctx.drawImage(character.src, 20, 20, 50, 100); 

    console.log('My Character is', world.Character);
}

window.addEventListener("keypress", (e) => {
    console.log(e);
});