const menuPrincipal = document.getElementById('menuPrincipal');
const container = document.getElementById('container');
const startGameBtn = document.getElementById('startGameBtn');
const exitGameBtn = document.getElementById('exitGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');
const endGameMenu = document.getElementById('endGameMenu');

// Función para iniciar el juego
function startGame() {
    menuPrincipal.style.display = 'none';
    container.style.display = 'block';
    gameOver = false;

    // Definir las distancias proporcionales desde los bordes
    const playerOffset = 0.1; // 10% desde el borde izquierdo
    const enemyOffset = 0.9; // 90% desde el borde izquierdo

    // Calcular las posiciones en función del ancho de la ventana
    const windowWidth = window.innerWidth;

    player.position = { 
        x: windowWidth * playerOffset, 
        y: 474 
    };
    player.velocity = { x: 0, y: 0 };

    enemy.position = { 
        x: windowWidth * enemyOffset, 
        y: 474 
    };
    enemy.velocity = { x: 0, y: 0 };

    player.health = 100;
    enemy.health = 100;
    document.querySelector('#playerHealth').style.width = player.health + '%';
    document.querySelector('#enemyHealth').style.width = enemy.health + '%';

    document.getElementById('displayText').style.display = 'none';
    endGameMenu.style.display = 'none';
    animate();
}

// Función para volver al menú principal
function backToMenu() {
    window.location.href = 'index.html'; // Redirigir al menú principal
}

function displayResult(result) {
    const displayTextElement = document.getElementById('displayText');
    displayTextElement.innerHTML = result;
    displayTextElement.style.display = 'flex';
}

function showEndGameMenu() {
    endGameMenu.style.display = 'flex';
}

startGameBtn.addEventListener('click', startGame);

exitGameBtn.addEventListener('click', () => {
    window.close();
});

backToMenuBtn.addEventListener('click', backToMenu);
playAgainBtn.addEventListener('click', startGame);
