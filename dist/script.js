// Get DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Game settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let speed = 7;

// Game state
let gameRunning = false;
let gamePaused = false;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;

// Snake initial state
let snake = [
    { x: 10, y: 10 }
];
let velocityX = 0;
let velocityY = 0;
let nextVelocityX = 0;
let nextVelocityY = 0;

// Food initial state
let food = {
    x: 5,
    y: 5
};

// Initialize high score display
highScoreElement.textContent = highScore;

// Event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', handleKeyPress);

// Draw functions
function drawGame() {
    if (!gameRunning) return;
    
    if (!gamePaused && !gameOver) {
        // Clear the canvas
        ctx.fillStyle = '#e8f5e9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        
        // Draw snake
        drawSnake();
        
        // Move snake
        moveSnake();
        
        // Check collisions
        checkCollisions();
        
        // Check if snake ate food
        checkFood();
        
        // Draw grid (optional)
        drawGrid();
    }
    
    // Game over message
    if (gameOver) {
        drawGameOver();
    }
    
    // Set up the next frame
    setTimeout(drawGame, 1000 / speed);
}

function drawSnake() {
    // Draw snake body
    ctx.fillStyle = '#388e3c';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
        
        // Draw border around snake parts
        ctx.strokeStyle = '#e8f5e9';
        ctx.lineWidth = 1;
        ctx.strokeRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }
    
    // Draw snake head with different color
    if (snake.length > 0) {
        ctx.fillStyle = '#2e7d32';
        ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize, gridSize);
    }
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= tileCount; i++) {
        // Draw vertical lines
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        // Draw horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
}

function drawGameOver() {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Game over text
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
    
    // Score text
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    
    // Instruction text
    ctx.font = '16px Arial';
    ctx.fillText('Press the Reset button to play again', canvas.width / 2, canvas.height / 2 + 60);
}

// Game logic functions
function moveSnake() {
    // Update velocity based on next velocity (prevents multiple direction changes between frames)
    velocityX = nextVelocityX;
    velocityY = nextVelocityY;
    
    // Move snake body
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }
    
    // Move snake head
    if (snake.length > 0) {
        snake[0].x += velocityX;
        snake[0].y += velocityY;
    }
}

function checkCollisions() {
    // Check wall collisions
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
        gameOver = true;
        return;
    }
    
    // Check self collisions (starting from the 4th segment)
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver = true;
            return;
        }
    }
}

function checkFood() {
    // Check if snake head is on food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        // Grow snake
        growSnake();
        
        // Generate new food
        generateFood();
        
        // Update score
        updateScore();
        
        // Increase speed slightly
        if (speed < 15) {
            speed += 0.2;
        }
    }
}

function growSnake() {
    // Add new segment at the end of the snake
    const tail = snake[snake.length - 1];
    snake.push({ ...tail });
}

function generateFood() {
    // Generate random position for food
    let newFoodPosition;
    let foodOnSnake;
    
    do {
        foodOnSnake = false;
        newFoodPosition = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Check if food is on snake
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === newFoodPosition.x && snake[i].y === newFoodPosition.y) {
                foodOnSnake = true;
                break;
            }
        }
    } while (foodOnSnake);
    
    food = newFoodPosition;
}

function updateScore() {
    score++;
    scoreElement.textContent = score;
    
    // Update high score if needed
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
}

// Game control functions
function handleKeyPress(e) {
    // Ignore key presses if game is not running or game is over
    if (!gameRunning || gameOver) return;
    
    // Pause/resume game with space bar
    if (e.code === 'Space') {
        gamePaused = !gamePaused;
        return;
    }
    
    // Ignore direction changes if game is paused
    if (gamePaused) return;
    
    // Handle direction changes
    // Prevent 180-degree turns by checking current velocity
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (velocityY !== 1) { // Not moving down
                nextVelocityX = 0;
                nextVelocityY = -1;
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (velocityY !== -1) { // Not moving up
                nextVelocityX = 0;
                nextVelocityY = 1;
            }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (velocityX !== 1) { // Not moving right
                nextVelocityX = -1;
                nextVelocityY = 0;
            }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (velocityX !== -1) { // Not moving left
                nextVelocityX = 1;
                nextVelocityY = 0;
            }
            break;
    }
}

function startGame() {
    if (!gameRunning && !gameOver) {
        gameRunning = true;
        startBtn.disabled = true;
        resetBtn.disabled = false;
        
        // Start with a random direction
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }, // Left
            { x: 1, y: 0 }   // Right
        ];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        nextVelocityX = randomDirection.x;
        nextVelocityY = randomDirection.y;
        
        // Start game loop
        drawGame();
    }
}

function resetGame() {
    // Reset game state
    gameRunning = false;
    gamePaused = false;
    gameOver = false;
    score = 0;
    speed = 7;
    
    // Reset snake
    snake = [{ x: 10, y: 10 }];
    velocityX = 0;
    velocityY = 0;
    nextVelocityX = 0;
    nextVelocityY = 0;
    
    // Generate new food
    generateFood();
    
    // Update score display
    scoreElement.textContent = score;
    
    // Reset buttons
    startBtn.disabled = false;
    resetBtn.disabled = true;
    
    // Clear canvas
    ctx.fillStyle = '#e8f5e9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw initial state
    drawSnake();
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    drawGrid();
}

// Initialize the game
function init() {
    // Generate initial food
    generateFood();
    
    // Draw initial state
    ctx.fillStyle = '#e8f5e9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    drawGrid();
    
    // Set initial button states
    startBtn.disabled = false;
    resetBtn.disabled = true;
}

// Start the game initialization when the page loads
window.onload = init;