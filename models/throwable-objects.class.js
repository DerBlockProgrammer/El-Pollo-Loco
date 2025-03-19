class ThrowableObjects extends MovableObject {
    constructor(x, y) {
        // Загружаем изображение бутылки
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 70;
        // Добавляем свойство, которое отмечает, что бутылка уже нанесла урон
        this.hasHit = false;
        // Запускаем движение бутылки
        this.startThrow();
    }
    
    /**
     * Метод startThrow инициирует движение бутылки:
     * - Задает вертикальную скорость и включает гравитацию.
     * - Каждые 20 мс увеличивает координату x, чтобы бутылка двигалась вправо.
     */
    startThrow() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
        }, 20);
    }
  
    /**
     * Метод checkCollisionWith проверяет столкновение бутылки с переданным объектом.
     * Если бутылка уже нанесла урон (hasHit == true), проверка не производится.
     * Используется простая проверка пересечения прямоугольников.
     * 
     * @param {Object} enemy - объект врага, с которым проверяется столкновение (должен иметь свойства x, y, width и height)
     * @returns {boolean} - true, если объекты пересекаются и столкновение ещё не было зарегистрировано, иначе false.
     */
    checkCollisionWith(enemy) {
        if (this.hasHit) return false;
        return this.x < enemy.x + enemy.width &&
               this.x + this.width > enemy.x &&
               this.y < enemy.y + enemy.height &&
               this.y + this.height > enemy.y;
    }
}
