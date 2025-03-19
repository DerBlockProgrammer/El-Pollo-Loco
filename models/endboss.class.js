class Endboss extends MovableObject {
    // Размеры и позиция Endboss
    height = 260;
    width = 300;
    y = 190;
    health = 100; // Начальное здоровье босса (100%)
    x = 2500;    // Начальная позиция босса

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
    // Здесь индекс 5 соответствует полному здоровью (blue100.png), а 0 — нулевому здоровью (blue0.png)
    IMAGES_STATUS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    // Индекс для выбора изображения статус-бара.
    // При полном здоровье должен быть равен 5.
    statusBarIndex = 5;
    isDead = false; // Флаг, сигнализирующий о смерти босса

    constructor() {
        // Загружаем первое изображение Endboss через метод родительского класса
        super().loadImage(this.IMAGES_WALKING[0]);
        // Загружаем остальные изображения для анимации ходьбы
        this.loadImages(this.IMAGES_WALKING);
        // Загружаем изображения для статус-бара (при необходимости, можно также кэшировать их)
        this.loadImages(this.IMAGES_STATUS);
        // Запускаем анимацию босса
        this.animate();
    }

    animate() {
        // Запускаем анимацию ходьбы
        this.playAnimation(this.IMAGES_WALKING);
        // Обновляем анимацию каждые 100 мс
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
        // Обратите внимание: вызов отрисовки статус-бара осуществляется извне (например, из world.class.js)
    }

    /**
     * Метод уменьшает здоровье Endboss на заданное значение.
     * Если здоровье опускается до 0, вызывается метод die().
     * Если босс уже мёртв, урон не наносится.
     * @param {number} amount - количество урона
     */
    takeDamage(amount) {
        if (this.isDead) return; // Если босс уже мёртв, ничего не делаем

        this.health -= amount; // Уменьшаем здоровье
        if (this.health < 0) {
            this.health = 0; // Предотвращаем отрицательное значение здоровья
        }
        // Обновляем статус-бар после изменения здоровья
        this.updateStatusBar();
        // Если здоровье достигло 0, вызываем метод смерти
        if (this.health === 0) {
            this.die();
        }
    }

    /**
     * Обновляет индекс статус-бара в зависимости от текущего здоровья.
     * При здоровье 100% индекс будет 5, при 80% — 4, при 60% — 3, при 40% — 2, при 20% — 1, при 0% — 0.
     */
    updateStatusBar() {
        // Рассчитываем индекс: для health=100 → index=5, для health=0 → index=0
        this.statusBarIndex = Math.floor((this.health / 100) * 5);
    }
    
    /**
     * Отрисовывает статус-бар над Endboss.
     * Принимает контекст canvas (ctx) для отрисовки.
     */
    drawStatusBar(ctx) {
        // Создаем новый объект Image для статус-бара
        const statusImage = new Image();
        statusImage.src = this.IMAGES_STATUS[this.statusBarIndex];
        // Рисуем статус-бар над боссом.
        // Координаты и размеры можно корректировать по необходимости.
        ctx.drawImage(statusImage, this.x, this.y - 170, 200, 60);
    }
    
    /**
     * Метод, вызываемый, когда Endboss погибает.
     * Устанавливает флаг isDead в true, что предотвращает дальнейший урон.
     * Дополнительно можно добавить анимацию смерти или эффекты.
     */
    die() {
        this.isDead = true;
        // Здесь можно добавить анимацию смерти, звуковой эффект или логику удаления босса из мира.
    }
    
    /**
     * Переопределённый метод draw, который отрисовывает Endboss и его hitbox (рамку для отладки).
     * @param {CanvasRenderingContext2D} ctx - контекст для отрисовки
     */
    draw(ctx) {
        // Отрисовываем изображение Endboss через метод родительского класса
        super.draw(ctx);
        // Рисуем рамку (hitbox) для отладки
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
}
