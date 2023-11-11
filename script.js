const boardSize = 50;
let board = [];
let intervalId = null;

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => {
                cell.classList.toggle('alive');
                board[i][j] = !board[i][j];
            });
            boardElement.appendChild(cell);
            board[i][j] = false;
        }
    }
}

function randomizeBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = Math.random() > 0.5;
        }
    }
}

function updateBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.querySelector(`.cell:nth-child(${i * boardSize + j + 1})`);
            if (board[i][j]) {
                cell.classList.add('alive');
            } else {
                cell.classList.remove('alive');
            }
        }
    }
}

function startGame() {
    intervalId = setInterval(() => {
        const newBoard = JSON.parse(JSON.stringify(board));
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                let aliveNeighbours = 0;
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (x === 0 && y === 0) continue;
                        const ni = i + x;
                        const nj = j + y;
                        if (ni >= 0 && ni < boardSize && nj >= 0 && nj < boardSize && board[ni][nj]) {
                            aliveNeighbours++;
                        }
                    }
                }
                if (board[i][j] && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
                    newBoard[i][j] = false;
                } else if (!board[i][j] && aliveNeighbours === 3) {
                    newBoard[i][j] = true;
                }
            }
        }
        board = newBoard;
        updateBoard();
    }, 100);
}

function stopGame() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);
document.getElementById('randomize').addEventListener('click', () => {
    randomizeBoard();
    updateBoard();
});

createBoard();
randomizeBoard();
updateBoard();