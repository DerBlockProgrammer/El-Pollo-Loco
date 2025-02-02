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
    
    walking_chicken = new Audio('audio/chicken.mp3')

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();


        this.walking_chicken.volume = 0.10;
        // this.walking_chicken.play();
        // this.walking_chicken.pause();

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000);
    }
    die() {
        if (this.isDead) return; 
        this.isDead = true;

        // Animation: Das Huhn fliegt nach oben
        let flyUpInterval = setInterval(() => {
            this.y -= 5; 
            if (this.y < -this.height) {
                clearInterval(flyUpInterval); 
            }
        }, 1000 / 60);
    }


}