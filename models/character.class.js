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

    world;

    walking_sound = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();

           
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.playAnimation(this.IMAGES_WALKING);
                this.walking_sound.play();
            } 
            
            else if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirection = true;
                this.playAnimation(this.IMAGES_WALKING);
            }
        
            else if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.playAnimation(this.IMAGES_JUMPING); 
            }
            
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

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60); 
    }
}
