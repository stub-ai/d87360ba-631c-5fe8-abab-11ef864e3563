const board = document.getElementById('board');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const randomizeButton = document.getElementById('randomize');

let cells = [];
let timerId = null;

// Initialize the board with random cells
for (let i = 0; i < 50 * 50; i++) {
    const cell = document.createElement('div');
    cell.classList.add(Math.random() > 0.5 ? 'alive' : 'dead');
    board.appendChild(cell);
    cells.push(cell);
}

// Game logic
function update() {
    const newCells = cells.map((cell, i) => {
        const x = i % 50;
        const y = Math.floor(i / 50);
        const neighbors = [
            cells[50 * ((y - 1 + 50) % 50) + ((x - 1 + 50) % 50)],
            cells[50 * ((y - 1 + 50) % 50) + x],
            cells[50 * ((y - 1 + 50) % 50) + ((x + 1) % 50)],
            cells[50 * y + ((x - 1 + 50) % 50)],
            cells[50 * y + ((x + 1) % 50)],
            cells[50 * ((y + 1) % 50) + ((x - 1 + 50) % 50)],
            cells[50 * ((y + 1) % 50) + x],
            cells[50 * ((y + 1) % 50) + ((x + 1) % 50)]
        ];
        const aliveCount = neighbors.filter(n => n.classList.contains('alive')).length;
        return cell.classList.contains('alive')
            ? aliveCount === 2 || aliveCount === 3 ? 'alive' : 'dead'
            : aliveCount === 3 ? 'alive' : 'dead';
    });
    cells.forEach((cell, i) => {
        cell.className = newCells[i];
    });
}

// Control buttons
startButton.addEventListener('click', () => {
    if (!timerId) {
        timerId = setInterval(update, 100);
    }
});

stopButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
});

randomizeButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.className = Math.random() > 0.5 ? 'alive' : 'dead';
    });
});