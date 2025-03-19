class Endboss extends MovableObject {
    // Размеры и позиция Endboss
    height = 260;
    width = 300;
    y = 190;
    health = 100;
    x = 2500;

    // Массив путей к изображениям для анимации ходьбы
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

    // Массив путей к изображениям для статус-бара Endboss (отображение здоровья)
    IMAGES_STATUS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    // Индекс для выбора изображения статус-бара (начальное здоровье 100% – индекс 5)
    statusBarIndex = 5;

    constructor() {
        // Загружаем первое изображение Endboss через метод родительского класса
        super().loadImage(this.IMAGES_WALKING[0]);
        // Загружаем остальные изображения для анимации ходьбы
        this.loadImages(this.IMAGES_WALKING);
        // Запускаем анимацию Endboss
        this.animate();
    }

    animate() {
        // Запускаем анимацию ходьбы
        this.playAnimation(this.IMAGES_WALKING);
        // Обновляем анимацию каждые 100 мс
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);

        // Убрали вызов несуществующего метода drawHealthBar,
        // так как статус-бар отрисовывается через метод drawStatusBar(ctx),
        // который вызывается извне (например, в методе draw() класса World).
    }

    /**
     * Метод уменьшает здоровье Endboss на заданное значение.
     * Если здоровье опускается до 0, вызывается метод die().
     */
    takeDamage(amount) {
        this.health -= amount; // Уменьшаем здоровье
        if (this.health < 0) {
            this.health = 0; // Предотвращаем отрицательное значение здоровья
        }
        // Обновляем статус-бар после изменения здоровья
        this.updateStatusBar();
        // Если здоровье достигло 0, вызываем смерть Endboss
        if (this.health === 0) {
            this.die();
        }
    }

    /**
     * Обновляет индекс статус-бара в зависимости от текущего здоровья.
     * Вычисление производится в дискретных шагах (20%-ные интервалы).
     */
    updateStatusBar() {
        const healthPercentage = Math.ceil((this.health / 100) * 5); // Рассчитываем процент здоровья
        this.statusBarIndex = 5 - healthPercentage; // Вычисляем индекс для статус-бара
    }
    
    /**
     * Отрисовывает статус-бар над Endboss.
     * Метод принимает контекст canvas (ctx) для отрисовки.
     */
    drawStatusBar(ctx) {
        const statusImage = new Image();
        statusImage.src = this.IMAGES_STATUS[this.statusBarIndex];
        // Рисуем статус-бар над Endboss (позиция и размеры могут корректироваться)
        ctx.drawImage(statusImage, this.x, this.y - 170, 200, 60);
    }
    
    /**
     * Отмечает, что Endboss погиб.
     */
    die() {
        this.isDead = true;
    }
    
    /**
     * Переопределённый метод draw, вызывающий отрисовку Endboss и его hitbox.
     */
    draw(ctx) {
        // Отрисовываем изображение Endboss через метод родительского класса
        super.draw(ctx);
        // Рисуем рамку для отладки (hitbox)
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
}
