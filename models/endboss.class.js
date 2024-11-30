class Endboss extends MovableObject {
    height = 260;
    width = 300;
    y = 190;
    health = 100;
   


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'


    ];

    IMAGES_STATUS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    statusBarIndex = 0;



    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.animate();
    }


    animate() {
        this.playAnimation(this.IMAGES_WALKING);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        // setInterval(() => {
        //     this.drawHealthBar();
        // }, 100);
    }



    takeDamage(amount) {
        this.life -= amount;  // Lebenspunkte reduzieren
        this.updateStatusBar();

        if (this.life <= 0) {
            this.life = 0;
        }
    }



    updateStatusBar() {
        if (this.life > 75) {
            this.statusBarIndex = 0;  // Volle Leiste
        } else if (this.life > 50) {
            this.statusBarIndex = 1;
        } else if (this.life > 25) {
            this.statusBarIndex = 2;
        } else {
            this.statusBarIndex = 3;  // Fast tot
        }
    }
    drawStatusBar(ctx) {

        const offsetY = 40;

        const statusImage = new Image();
        statusImage.src = this.IMAGES_STATUS[this.statusBarIndex];
        ctx.drawImage(statusImage, this.x, this.y - 170, 200, 60);
    }
    




}