// Play board é a Tela ou trabalho
// Conteiner onde a cobra e a comida serão renderizadas 
const playBoard = document.querySelector(".play-board");

// Pontuação atual do jogador  
const scoreElement = document.querySelector(".score");

// Recorde (maior pontuação)
const highScoreElement = document.querySelector(".high-score");

// Controle de movimento 
// Seleciona elementos <i> (ícones botões) para dispositivos móveis
const controls = document.querySelectorAll(".controls i");

// Cadastro de variáveis
let gameOver = false;
let foodx, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Obtenha pontuação alta do armazenamento local
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

// Gera posição aleatória entre 1 e 30 para comida
const updateFoodPosition = () => {
    foodx = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

// Função para lidar com o fim do jogo
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Poxa, deixou perder! Aperte Ok para iniciar novamente...");
    location.reload();
};

// Função para mudar a direção da cobrinha
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

controls.forEach(button =>
    button.addEventListener("click", () =>
        changeDirection({ key: button.dataset.key })
    )
);

// Função principal do jogo
const InitGame = () => {
    if (gameOver) return handleGameOver();

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodx}"></div>`;

    // Quando a cobra come a comida
    if (snakeX === foodx && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodx]);
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    // Verifica colisão com as bordas
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // Verifica se a cabeça colidiu com o corpo
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = html;
};

// Inicialização
updateFoodPosition();
setIntervalId = setInterval(InitGame, 100);
document.addEventListener("keyup", changeDirection);
