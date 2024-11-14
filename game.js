let canvas;
let world;
let keyboard = new Keyboard();

function init() {

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');


    character.src = '../img/img/2_character_pepe/2_walk/W-21.png';
    ctx.drawImage(character.src, 20, 20, 50, 100);

    console.log('My Character is', world.Character);
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        Keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        Keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        Keyboard.UP = true;
    }
    if (e.KeyCode == 40) {
        Keyboard.DOWN = true;
    }
    if (e.KeyCode == 32) {
        Keyboard.SPACE = true;
    }
    console.log(e);
});
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        Keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        Keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        Keyboard.UP = false;
    }
    if (e.KeyCode == 40) {
        Keyboard.DOWN = false;
    }
    if (e.KeyCode == 32) {
        Keyboard.SPACE = false;
    }
});