console.log('Loaded app.js');

import { Player, mouse2 } from './player.js';

//get canvas
const ctx = canvas.getContext('2d');

//set canvas size to the size of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Enemy = new Player('bug.png', 14, 18);

function animate(){
    if (canvas){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //console.log('animate');
        Enemy.update(ctx);
        requestAnimationFrame(animate);
    }
}
animate();

//update mouse position
document.addEventListener('mousemove', (e) => {
    mouse2.x = e.clientX;
    mouse2.y = e.clientY;
});

//keyboard
window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'ArrowUp':
            mouse2.y -= 10;
            break;
        case 'ArrowDown':
            mouse2.y += 10;
            break;
        case 'ArrowLeft':
            mouse2.x -= 10;
            break;
        case 'ArrowRight':
            mouse2.x += 10;
            break;
    }
    console.log(mouse2);
});