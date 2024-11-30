class Endboss extends MovableObject {
    height = 260;
    width = 300;
    y = 190;
    health = 100;
    x = 2500;
   


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

    statusBarIndex = 5;



    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
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
        this.health -= amount; // Reduziere Lebenspunkte
        if (this.health < 0) {
            this.health = 0; // Verhindere negative Lebenspunkte
        }
        this.updateStatusBar(); // Aktualisiere die StatusBar
    
        if (this.health === 0) {
            this.die(); // Endboss stirbt, wenn die Lebenspunkte auf 0 fallen
        }
    }
    



    updateStatusBar() {
        const healthPercentage = Math.ceil((this.health / 100) * 5); // Berechnung in 20%-Schritten
        this.statusBarIndex = 5 - healthPercentage; // Passe die StatusBar an
    }
    
    
    drawStatusBar(ctx) {
       
    
        const statusImage = new Image( );
        statusImage.src = this.IMAGES_STATUS[this.statusBarIndex];
        ctx.drawImage(statusImage, this.x, this.y - 170, 200, 60);
    }
    
    die() {
        this.isDead = true;
      
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height); // Hitbox anzeigen
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }



}