class Character extends MovableObject {
    height = 270;
    y = 170;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_long_idle/I-1.png',
        'img/2_character_pepe/1_long_idle/I-2.png',
        'img/2_character_pepe/1_long_idle/I-3.png',
        'img/2_character_pepe/1_long_idle/I-4.png',
        'img/2_character_pepe/1_long_idle/I-5.png',
        'img/2_character_pepe/1_long_idle/I-6.png',
        'img/2_character_pepe/1_long_idle/I-7.png',
        'img/2_character_pepe/1_long_idle/I-8.png'
    ];

    collectedCoins = 0;
    world;
    walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity(); // Предполагается, что метод applyGravity() реализован в родительском классе
        this.animate();
    }

    // Проверяет столкновение с монетами и собирает их
    checkCoinCollision() {
        if (!this.world || !this.world.coins) {
            return; // Если world или массив coins не определены, выходим из метода
        }
        this.world.coins.forEach((coin, index) => {
            if (this.isColliding(coin)) { // Проверка столкновения с монетой
                this.world.coins.splice(index, 1); // Удаляем монету из массива
                this.collectCoin(); // Обновляем счетчик монет
            }
        });
    }
    

    collectCoin() {
        this.collectedCoins++;
        let percentage = Math.min(this.collectedCoins * 20, 100); // Пересчет в проценты (максимум 100%)
        this.world.coinStatusBar.setPercentage(percentage); // Обновляем отображение статуса монет
    }

    /**
     * Метод для прыжка.
     * Если персонаж находится на земле (isAboveGround() возвращает false),
     * задаем ему вертикальную скорость для прыжка.
     */
    jump() {
        if (!this.isAboveGround()) {
            // Задаем начальное значение вертикальной скорости (например, 30)
            this.speedY = 30;
        }
    }

    /**
     * Метод для броска бутылки.
     * Создает новый объект бутылки и добавляет его в массив throwableObjects мира.
     */
    throwBottle() {
        // Позиционируем бутылку относительно персонажа.
        let bottle = new ThrowableObjects(this.x + 50, this.y + 50);
        // Добавляем бутылку в массив бросаемых объектов
        this.world.throwableObjects.push(bottle);
        // Можно добавить звук или анимацию броска, если необходимо.
    }

    animate() {
        setInterval(() => {
            // Если this.world или this.world.keyboard ещё не установлены, пропускаем этот кадр
            if (!this.world || !this.world.keyboard) return;
    
            this.checkCoinCollision();
            // Приостанавливаем звук ходьбы, чтобы избежать наложения
            this.walking_sound.pause();
    
            // Движение вправо
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.playAnimation(this.IMAGES_WALKING);
                this.walking_sound.play();
            }
            // Движение влево
            else if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.playAnimation(this.IMAGES_WALKING);
                this.walking_sound.play();
            }
            // Прыжок при нажатии пробела, если персонаж на земле
            else if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.playAnimation(this.IMAGES_JUMPING); 
            }
            // Бросок бутылки при нажатии клавиши "D"
            else if (this.world.keyboard.D) {
                this.throwBottle();
            }
            // Если персонаж стоит на месте на земле, проигрываем анимацию бездействия
            else if (!this.isAboveGround()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
    
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
    
            // Обновление позиции камеры
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60); 
    }
    
}
