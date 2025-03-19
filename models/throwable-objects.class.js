class ThrowableObjects extends MovableObject {
  constructor(x, y) {
      // Загружаем изображение бутылки
      super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 70;
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
   * Используется простая проверка пересечения прямоугольников.
   * 
   * @param {Object} enemy - объект врага, с которым проверяется столкновение (должен иметь свойства x, y, width и height)
   * @returns {boolean} - true, если объекты пересекаются, иначе false.
   */
  checkCollisionWith(enemy) {
      return this.x < enemy.x + enemy.width &&
             this.x + this.width > enemy.x &&
             this.y < enemy.y + enemy.height &&
             this.y + this.height > enemy.y;
  }
}
