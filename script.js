document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');
    const message = document.getElementById('message');
    const button = document.getElementById('button');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleBoxClick(clickedBox, clickedBoxIndex) {
        gameState[clickedBoxIndex] = currentPlayer;
        clickedBox.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            button.style.visibility = 'visible';
        } else if (!gameState.includes('')) {
            message.textContent = "It's a draw!";
            gameActive = false;
            button.style.visibility = 'visible';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        message.textContent = '';
        button.style.visibility = 'hidden';
        boxes.forEach(box => {
            box.textContent = '';
        });
    }

    boxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            const clickedBox = box;
            const clickedBoxIndex = index;

            if (gameState[clickedBoxIndex] === '' && gameActive) {
                handleBoxClick(clickedBox, clickedBoxIndex);
            }
        });
    });

    button.addEventListener('click', resetGame);
});
