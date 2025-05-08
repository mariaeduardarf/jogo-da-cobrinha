//Play board é a Tela ou trabalho
//Conteiner onde a cobra e a comida serão renderizadas 
const playBoard = document.querySelector("play-board");
//Pontuação atual do jogador  
const scoreElement = document.querySelector(".score");
//Recorde (maior pontuação)
const highScoreElement = document.querySelector(".high-score");
//Controle de movimento 
/*Selecina elementos <i> Icones Botões para Device Mobiles */
const controls = document.querySelectorAll(".controls i");

//Cadastro de Variaveis 
// Variavel Boleana que indica se o jogo terminou 
let gameOver = false;
//variavel para armazenar as coordenadas X e Y da Comida 
let foodx, foodY;
//Armazena as coordenadas x e y da cabeça da cobra (posição inicial de 5)
let snakeX = 5, snakeY = 5;
//varaiavel para armazenar a velocidade nas direções x e y, inicialmente em 0
let velocityX = 0, velocityY = 0;
// uma Array para armazenar as coordenadas de cada segmento do corpo, primeiro elemento é a cabeça  
let snakeBody = [];
/*variavel para armazenar o ID do intervalo que será usado para atualizar o jogo de um determinado      ritmo.*/
let setIntervalId;
//Uma variavel para manter o controle da pontuação arual do jogador 
let score = 0;



// Obtenha pontuação alta do armazenamento local
/*Tenta recuperar o valor associado à chave "high-score" do armazenamento local do navegador*/ 
let highScore = localStorage.getItem("high-score") || 0;
/*Se o localStorage retornar NULL (caso ele não exista), a variavel highscore será definida como 0 */

//posição aleatoria entre 1 e 30 para comida
/*Gera coordenadas aleatorias para a nova posição da comida */ 
const updateFoodPosition = () => {
    //Math.random() = retorna um numero de ponto flutuante pseudoaleatório entre 0 e 1
    //30 multiplica o número aleatório por 30 para obter um valot entre 0 quase 30
    // +1 adiciona 1 para garantir que as coodenadas da comida sejam entre 1 e 30.
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//Função para lidar com o Fim do Jogo 
//Função handleGameOver = quando a cobra colide consigo mesma ou com as paredes do tabuleiro 

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Poxa deixou perder! Aperte Ok para iniciar novamente...");
    location.reload();
}

// Função para Mudar a direção da cobrinha 
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
 }

 controls.forEach(button => button.addEventListener("click", () => changeDirection({key: button.dataset.key})));

 //Começar o Game = InitGame
 const InitGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"`;

    // Quando a cobra come
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
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

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }


 }

