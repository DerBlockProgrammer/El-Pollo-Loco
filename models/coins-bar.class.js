class CoinStatusBar extends DrawableObject{
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/2.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/3.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/4.png'


    ];
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40; 
        this.y = 60; 
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }
    setPercentage(percentage) {
        this.percentage = percentage; 
        let imageIndex = Math.floor(this.percentage / 20); // Ermittelt das passende Bild
        this.img = this.imageCache[this.IMAGES[imageIndex]];

}
resolveImageIndex() {
    if (this.percentage == 100) { 
        return 5;
    } else if (this.percentage > 80) {
        return 4;
    } else if (this.percentage > 60) {
        return 3;
    } else if (this.percentage > 40) {
        return 2;
    } else if (this.percentage > 20) { 
        return 1;
    } else {
        return 0;
    }
}
}