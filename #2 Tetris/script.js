const board = document.getElementById('tetris-board');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const rows = 20;
const cols = 10;
let boardArray = [];
let currentPiece;
let currentPosition;
let score = 0;
let gameInterval;

// Tetris piece shapes
const pieces = [
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]], // Z
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]], // J
];

function startGame() {
    boardArray = Array.from({ length: rows }, () => Array(cols).fill(0));
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    board.innerHTML = '';
    createBoard();
    spawnPiece();
    gameInterval = setInterval(moveDown, 1000);
}

function createBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const square = document.createElement('div');
            board.appendChild(square);
        }
    }
}

function spawnPiece() {
    const randomIndex = Math.floor(Math.random() * pieces.length);
    currentPiece = pieces[randomIndex];
    currentPosition = { row: 0, col: Math.floor(cols / 2) - 1 };
    drawPiece();
}

function drawPiece() {
    currentPiece.forEach((row, r) => {
        row.forEach((value, c) => {
            if (value) {
                const index = (currentPosition.row + r) * cols + (currentPosition.col + c);
                board.children[index].style.backgroundColor = 'red';
            }
        });
    });
}

function undrawPiece() {
    currentPiece.forEach((row, r) => {
        row.forEach((value, c) => {
            if (value) {
                const index = (currentPosition.row + r) * cols + (currentPosition.col + c);
                board.children[index].style.backgroundColor = '';
            }
        });
    });
}

function moveDown() {
    if (!isCollision(currentPiece, currentPosition.row + 1, currentPosition.col)) {
        undrawPiece();
        currentPosition.row++;
        drawPiece();
    } else {
        mergePiece();
        clearLines();
        spawnPiece();
        if (isCollision(currentPiece, currentPosition.row, currentPosition.col)) {
            clearInterval(gameInterval);
            alert('Game Over! Score: ' + score);
        }
    }
}

function moveLeft() {
    if (!isCollision(currentPiece, currentPosition.row, currentPosition.col - 1)) {
        undrawPiece();
        currentPosition.col--;
        drawPiece();
    }
}

function moveRight() {
    if (!isCollision(currentPiece, currentPosition.row, currentPosition.col + 1)) {
        undrawPiece();
        currentPosition.col++;
        drawPiece();
    }
}

function rotatePiece() {
    const rotatedPiece = currentPiece[0].map((_, index) => currentPiece.map(row => row[index]).reverse());
    if (!isCollision(rotatedPiece, currentPosition.row, currentPosition.col)) {
        undrawPiece();
        currentPiece = rotatedPiece;
        drawPiece();
    }
}

function isCollision(piece, row, col) {
    return piece.some((r, rIndex) => {
        return r.some((value, cIndex) => {
            if (value) {
                const newRow = row + rIndex;
                const newCol = col + cIndex;
                return (
                    newRow >= rows || 
                    newCol < 0 || 
                    newCol >= cols || 
                    (newRow >= 0 && boardArray[newRow][newCol] !== 0)
                );
            }
            return false;
        });
    });
}

function mergePiece() {
    currentPiece.forEach((row, r) => {
        row.forEach((value, c) => {
            if (value) {
                boardArray[currentPosition.row + r][currentPosition.col + c] = value;
            }
        });
    });
}

function clearLines() {
    for (let r = rows - 1; r >= 0; r--) {
        if (boardArray[r].every(value => value !== 0)) {
            boardArray.splice(r, 1);
            boardArray.unshift(Array(cols).fill(0));
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
            renderBoard();
        }
    }
}

function renderBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const index = r * cols + c;
            if (boardArray[r][c]) {
                board.children[index].style.backgroundColor = 'blue';
            } else {
                board.children[index].style.backgroundColor = '';
            }
        }
    }
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
    if (e.key === 'ArrowDown') moveDown();
    if (e.key === 'ArrowUp') rotatePiece();
});
