class World {
    character = new Character();
   level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }
    setWorld(){
        this.character.world = this;
    }

    checkCollisions()
{
    setInterval(() => {
           this.level.enemies.forEach((enemy) =>{
            if(this.character.isColling(enemy)){
                
                this.character.hit();
               
            }

           });
        
    }, 200);
}
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects){
       objects.forEach(o => {
            this.addToMap(o);
        });

    }

    addToMap(mo){
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
            
        }
       mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
       

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
            
        }
    }
}