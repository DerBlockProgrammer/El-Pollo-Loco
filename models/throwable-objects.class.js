class ThrowableObjects extends MovableObject{
    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 70;
        this.trow(100,150);
      
    }

  trow(){
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
        this.x += 5;
        
    }, 20);
  }
    
}

