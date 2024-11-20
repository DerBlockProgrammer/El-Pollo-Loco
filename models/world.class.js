class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];
    backgroundMusic;
    musicInterval;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.backgroundMusic = new Audio('./audio/mexikan.mp3'); // Pfad zur Musikdatei
        this.backgroundMusic.loop = true; 
        this.backgroundMusic.volume = 0.1; 
        this.backgroundMusic.play(); 
        this.setupMusic();
        this.draw();
        this.setWorld();
        this.run();
    }
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
           this.checkCollisions();
           this.checkThrowObjects();

        }, 200);
    }

    //Musik Intervall
    setupMusic() {
        const playDuration = 5000; 
        const pauseDuration = 3000; 

        this.musicInterval = setInterval(() => {
            this.backgroundMusic.play(); 

           
            setTimeout(() => {
                this.backgroundMusic.pause();
                this.backgroundMusic.currentTime = 0; 
            }, playDuration);
        }, playDuration + pauseDuration);
    }

    checkThrowObjects(){
        if (this.keyboard.D) {
            let bottle = new ThrowableObjects(this.character.x +100, this.character.y +100) ;
            this.throwableObjects.push(bottle);            
        }
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColling(enemy) && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColling(enemy) && !enemy.isDead) {
                    enemy.die(); // Gegner stirbt
                    this.removeThrowableObject(bottle); // Flasche entfernen
                }
            });
        });






    }
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);


        this.ctx.translate(-this.camera_x, 0); // zurück kamera, Objekte fixieren

        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); //vorwärts kamera

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });

    }
    

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;

        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();

        }
    }
    
    

}
