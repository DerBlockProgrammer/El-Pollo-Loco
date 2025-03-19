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
    gameEnded = false; // Флаг, сигнализирующий о завершении игры

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        // Инициализируем аудиофайл, но не запускаем его автоматически
        this.backgroundMusic = new Audio('./audio/mexikan.mp3');
        this.backgroundMusic.loop = true;   // Может конфликтовать с периодическим play/pause в setupMusic()
        this.backgroundMusic.volume = 0.1;

        // Убираем автозапуск:
        // this.backgroundMusic.play();
        // this.setupMusic();

        // Инициализируем панель для монет
        this.coinStatusBar = new CoinStatusBar();

        // Запускаем основные процессы отрисовки и логики
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Метод, который можно вызвать после клика пользователя,
     * чтобы запустить музыку без ошибки "NotAllowedError".
     */
    startMusic() {
        // Если хотите, чтобы музыка просто играла в бесконечном цикле, используйте:
        // this.backgroundMusic.play();

        // Если нужно чередование play/pause (по 5 секунд играть, 3 секунды пауза),
        // раскомментируйте вызов setupMusic():
        this.setupMusic();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.world = this; // Передаём ссылку на World в Endboss
            }
        });
    }

    run() {
        setInterval(() => {
            if (!this.gameEnded) {
                this.checkCollisions();
                this.checkThrowObjects();
            }
        }, 200);
    }

    /**
     * Чередование проигрывания музыки:
     *  - 5 секунд играет,
     *  - 3 секунды пауза,
     *  - повторяется.
     */
    setupMusic() {
        const playDuration = 5000;   // 5 секунд
        const pauseDuration = 3000;  // 3 секунды

        this.musicInterval = setInterval(() => {
            this.backgroundMusic.play();

            setTimeout(() => {
                this.backgroundMusic.pause();
                this.backgroundMusic.currentTime = 0;
            }, playDuration);
        }, playDuration + pauseDuration);
    }

    /**
     * Проверяет, нажата ли клавиша для броска бутылок, и создает новый объект бутылки.
     */
    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    /**
     * Проверяет столкновения между:
     *  - персонажем и врагами,
     *  - персонажем и монетами,
     *  - бутылками и врагами.
     * При столкновениях наносится урон или удаляются объекты, и при достижении условий
     * вызываются экраны победы или поражения.
     */
    checkCollisions() {
        // Столкновения между персонажем и врагами
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColling(enemy) && !enemy.isDead) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                // Если энергии персонажа не осталось, игра проиграна
                if (this.character.energy <= 0 && !this.gameEnded) {
                    this.gameEnded = true;
                    this.showGameOverScreen();
                }
            }
        });

        // Столкновения между персонажем и монетами
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.character.collectCoin();
            }
        });

        // Столкновения между бутылками и врагами
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColling(enemy) && !enemy.isDead) {
                    if (enemy instanceof Endboss) {
                        enemy.takeDamage(5); // Наносим урон Endboss
                        // Если здоровье Endboss опустилось до 0, игра выиграна
                        if (enemy.health === 0 && !this.gameEnded) {
                            this.gameEnded = true;
                            this.showVictoryScreen();
                        }
                    } else {
                        enemy.die();
                    }
                }
            });
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        // Рисуем фоновые объекты
        this.addObjectsToMap(this.level.backgroundObjects);

        // Возвращаем камеру в исходное положение для отрисовки статических элементов
        this.ctx.translate(-this.camera_x, 0);

        // Рисуем статус-бары (жизни, монеты)
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);

        // Сдвигаем камеру для отрисовки динамических объектов
        this.ctx.translate(this.camera_x, 0);

        // Рисуем монеты и персонажа
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);

        // Рисуем врагов и, если Endboss, его панель здоровья
        this.level.enemies.forEach((enemy) => {
            this.addToMap(enemy);
            if (enemy instanceof Endboss && enemy.x + enemy.width > -this.camera_x) {
                enemy.drawStatusBar(this.ctx);
            }
        });

        // Рисуем облака и бросаемые объекты
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        // Возвращаем камеру в исходное положение
        this.ctx.translate(-this.camera_x, 0);

        // Рекурсивная перерисовка
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.x + mo.width, mo.y);
            this.ctx.scale(-1, 1);
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
            this.ctx.restore();
        } else {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        }
    }

    /**
     * Метод для отображения экрана победы.
     */
    showVictoryScreen() {
        alert("Поздравляем, вы победили!");
        // Здесь можно добавить логику для рестарта игры, например, перезагрузку страницы:
        // window.location.reload();
    }

    /**
     * Метод для отображения экрана поражения.
     */
    showGameOverScreen() {
        alert("Игра проиграна!");
        // Здесь можно добавить логику для рестарта игры, например, перезагрузку страницы:
        // window.location.reload();
    }
}
