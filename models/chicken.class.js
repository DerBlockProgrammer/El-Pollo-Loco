class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 80;
    isDead = false;
    deathAnimationStarted = false;
    deathSpeed = 5;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    walking_chicken = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        // Позиция и скорость передвижения
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

        // Запускаем анимацию
        this.animate();

        // Настраиваем громкость, но не воспроизводим автоматически
        this.walking_chicken.volume = 0.1;
        // Удаляем автозапуск звука, чтобы избежать ошибок в браузерах
        // this.walking_chicken.play(); 
        // this.walking_chicken.pause();
    }

    animate() {
        // Движение влево
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Анимация "шага"
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000);
    }

    die() {
        // Если уже мертва, ничего не делаем
        if (this.isDead) return;
        this.isDead = true;

        // "Анимация смерти": курица "улетает" вверх
        let flyUpInterval = setInterval(() => {
            this.y -= 5;
            if (this.y < -this.height) {
                clearInterval(flyUpInterval);
            }
        }, 1000 / 60);
    }
}
