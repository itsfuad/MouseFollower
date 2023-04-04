console.log('Robot canvas mounted');


export class Player{
    /**
     * @param {string} sprite
     * @param {number} n_cols
     * @param {number} n_rows
     */
    constructor(sprite, n_cols, n_rows, x = 0, y = 0){
        console.log("Enemy created");
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.spriteHeight = 0;
        this.spriteWidth = 0;
        this.SPRITE_NO = 12;
        this.CURRENT_FRAME = 0;
        this.frames = 9;
        this.counter = 0;
        this.idle = true;
        this.ideTimeout = undefined;
        this.returning = false;
        this.pointermoving = false;
        this.timer = undefined;
        this.spriteMap = {
            'up': 0,
            'down': 4,
            'left': 6,
            'right': 2,
            'up-left': 7,
            'up-right': 1,
            'down-left': 5,
            'down-right': 3,
            'idle': 12
        }
        this.speed = {x: 0, y: 0};
        //x is 0 or canvas.width
        this.x = Math.random() < 0.5 ? -20 : canvas.width + 20;
        //y is 0 or canvas.height
        this.y = Math.random() < 0.5 ? -20 : canvas.height + 20;
        this.fps = 2;
        this.sprite.onload = () => {

            this.spriteWidth = this.sprite.width/n_cols;
            this.spriteHeight = this.sprite.height/n_rows;

            document.onmousemove = (e) => {
                mouse2.x = e.x - this.spriteWidth/2;
                mouse2.y = e.y - this.spriteHeight/2;
                this.idle = false;
                this.returning = false;
                this.pointermoving = true;

                //if mouse is not moving
                if(this.timer){
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.pointermoving = false;
                    this.returning = true;
                }, 50);
            };

            document.ontouchmove = (e) => {
                mouse2.x = e.touches[0].clientX - this.spriteWidth/2;
                mouse2.y = e.touches[0].clientY - this.spriteHeight/2;
                this.idle = false;
                this.returning = false;
                this.pointermoving = true;

                //if mouse is not moving
                if(this.timer){
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.pointermoving = false;
                    this.returning = true;
                }, 50);
            };

            document.onmouseleave = () => {
                this.idleTimeOut = undefined;
                this.idle = true;
                this.returning = false;
                this.pointermoving = false;
            };

            document.ontouchend = () => {
                this.idleTimeOut = undefined;
                this.idle = true;
                this.returning = false;
                this.pointermoving = false;
            };

            window.onresize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                //console.log('resize event');
                //reposition player
                mouse2.x = Math.random() < 0.5 ? -20 : canvas.width + 20;
                mouse2.y = Math.random() < 0.5 ? -20 : canvas.height + 20;
                this.returning = false;
            };
        }
    }

    update(ctx){
    
        if (!this.idle){

            //console.log(this.pointermoving);
            //go to mouse position
            const dx = this.x - mouse2.x;
            const dy = this.y - mouse2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            //angle to degrees
            const angle2 = angle * 180 / Math.PI;
            //console.log(angle2);

            //set sprite direction
            if (angle2 >= 0 && angle2 <= 22.5){
                this.SPRITE_NO = this.spriteMap['left'];
                this.frames = 7;
            } else if (angle2 > 22.5 && angle2 <= 67.5){    
                this.SPRITE_NO = this.spriteMap['up-left'];
                this.frames = 7;
            } else if (angle2 > 67.5 && angle2 <= 112.5){
                this.SPRITE_NO = this.spriteMap['up'];
                this.frames = 7;
            } else if (angle2 > 112.5 && angle2 <= 157.5){
                this.SPRITE_NO = this.spriteMap['up-right'];
                this.frames = 7;
            } else if (angle2 > 157.5 && angle2 <= 180){
                this.SPRITE_NO = this.spriteMap['right'];
                this.frames = 7;
            } else if (angle2 > -180 && angle2 <= -157.5){
                this.SPRITE_NO = this.spriteMap['right'];
                this.frames = 7;
            } else if (angle2 > -157.5 && angle2 <= -112.5){
                this.SPRITE_NO = this.spriteMap['down-right'];
                this.frames = 7;
            } else if (angle2 > -112.5 && angle2 <= -67.5){
                this.SPRITE_NO = this.spriteMap['down'];
                this.frames = 7;
            } else if (angle2 > -67.5 && angle2 <= -22.5){
                this.SPRITE_NO = this.spriteMap['down-left'];
                this.frames = 7;
            } else if (angle2 > -22.5 && angle2 <= 0){
                this.SPRITE_NO = this.spriteMap['left'];
                this.frames = 7;
            }


            this.speed.x = Math.cos(angle) * 5;
            this.speed.y = Math.sin(angle) * 5;

            this.x -= this.speed.x;
            this.y -= this.speed.y;
            
            this.fps = 7;
            
            //check if player is close to mouse
            if (distance < 10 && !this.pointermoving){
                this.speed.x = 0;
                this.speed.y = 0;
                this.idle = true;
                this.SPRITE_NO = this.spriteMap['idle'];
                //console.log('idle');
                this.idle = true;
                this.fps = 2;
            }
            //this.x += this.speed.x / 5;
            //this.y += this.speed.y / 5;

        }else{
            this.SPRITE_NO = this.spriteMap['idle'];
            this.fps = 2;

            //if mouse within the canvas
            if (mouse2.x > 0 && mouse2.x < canvas.width && mouse2.y > 0 && mouse2.y < canvas.height){
                //console.log('Reached mouse');
                mouse2.x = Math.random() < 0.5 ? -20 : canvas.width + 20;
                mouse2.y = Math.random() < 0.5 ? -20 : canvas.height + 20;

                //after 3 seconds, return to idle
                if (this.idleTimeOut){
                    clearTimeout(this.idleTimeOut);
                }
                this.idleTimeOut = setTimeout(() => {
                    //console.log("bored!");
                    this.idle = false;
                    this.returning = true; 
                }, 3000);
            }
        }

        this.CURRENT_FRAME = Math.floor(this.counter++ * (this.fps / 10) ) % this.frames;
        //translate to center of sprite
        
        ctx.drawImage(this.sprite, this.CURRENT_FRAME * this.spriteWidth, this.SPRITE_NO * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y - this.spriteHeight/2, this.spriteWidth, this.spriteHeight);
    }
    
}

export const mouse2 = {
    x: null,
    y: null
}