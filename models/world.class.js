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
    coinStatusBar = new CoinStatusBar();
    coins = [];



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.backgroundMusic = new Audio('./audio/mexikan.mp3'); // Pfad zur Musikdatei
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.1;
        this.backgroundMusic.play();
        this.setupMusic();
        this.coinStatusBar = new CoinStatusBar(); // Hinzufügen der Coin-Bar
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.world = this; // Endboss erhält Zugriff auf die World-Instanz
            }
        });

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

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);

        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColling(enemy) && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
            

        });
        


        // this.level.coins.forEach((coin, index) => {
        //     if (this.character.isColliding(coin)) {
        //         this.level.coins.splice(index, 1); // Coin aus der Liste entfernen
        //         this.character.collectCoin(); // Coin sammeln
        //     }
        // });

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColling(enemy) && !enemy.isDead) {
                    if (enemy instanceof Endboss) {
                        enemy.takeDamage(5);
                    }else {
                        enemy.die();
                    }
                  

                }
            });
        });


    }
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        //HintergrundObjekte zeichnen
        this.addObjectsToMap(this.level.backgroundObjects);



        this.ctx.translate(-this.camera_x, 0); // zurück kamera, Objekte fixieren

        //HintergrundObjekte zeichnen
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);

        // Coins und Charakter zeichnen
        this.ctx.translate(this.camera_x, 0); //vorwärts kamera
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);

        // Endboss und StatusBar zeichnen
        this.level.enemies.forEach((enemy) => {
            this.addToMap(enemy); // Zeichne Feind
            if (enemy instanceof Endboss && enemy.x + enemy.width > -this.camera_x) {
                enemy.drawStatusBar(this.ctx); // Zeichne StatusBar des Endbosses
            }
        });

        // Wolken und Objekte wie Flaschen zeichnen
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
            this.ctx.translate(mo.x + mo.width, mo.y); // Richtige Position für Spiegelung
            this.ctx.scale(-1, 1);
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
            this.ctx.restore();
        } else {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        }
    }


}


