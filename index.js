const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajusta el tamaño del canvas para ocupar toda la pantalla
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Propiedades de los jugadores
ctx.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 1;

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50; // Ancho del jugador
        this.height = 150;
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        // Actualiza la posición horizontal
        this.position.x += this.velocity.x;

        // Mantener al jugador dentro de los límites del canvas
        if (this.position.x <= 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width >= canvas.width) {
            this.position.x = canvas.width - this.width;
        }

        // Actualiza la posición vertical
        this.position.y += this.velocity.y;

        // Verificar si el jugador está tocando el suelo
        if (this.position.y + this.height + this.velocity.y >= canvas.height -100) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position: {
        x: 150,
        y: 474
    },
    velocity: {
        x: 0,
        y: 10
    }
});

const enemy = new Sprite({
    position: {
        x: 1300,
        y: 474
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowRight: { pressed: false},
    ArrowLeft: { pressed: false}
};
let lastKey

function animate() {
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    // Movimiento del jugador con los límites
    if (keys.a.pressed && player.position.x > 30 && lastKey === 'a') {
        player.velocity.x = -10;
    } else if (keys.d.pressed && player.position.x + player.width < canvas.width-30  && lastKey === 'd') {
        player.velocity.x = 10;
    } else {
        player.velocity.x = 0; // Detener el movimiento si no se presionan teclas
    }

    if (keys.ArrowLeft.pressed && enemy.position.x > 30 && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -10;
    } else if (keys.ArrowRight.pressed && enemy.position.x + enemy.width < canvas.width-30 && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 10;
    } else {
        enemy.velocity.x = 0; // Detener el movimiento si no se presionan teclas
    }
}

animate();

// Movimiento
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -20
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
    }
    switch (event.key) {
        case 'ArrowRight':
          keys.ArrowRight.pressed = false
          break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = false
          break
      }
});
