const TicTac = {
    cPlayer: "X",
    state: Array(9).fill(null), 
    gameOver: false, 

    
    init() {
        this.cBoard();
        document
            .getElementById("reset")
            .addEventListener("click", () => this.reset());
    },

    
    cBoard() {
        const board = document.getElementById("board");
        board.innerHTML = ""; 
        this.state.forEach((_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
        });
        board.addEventListener("click", (e) => this.handleClick(e)); 
        this.uMessage(`Player ${this.cPlayer}'s turn`);
    },

    
    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;

        
        if (this.gameOver || !cell.classList.contains("cell") || this.state[i])
            return;

       
        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken");

       
        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`Player ${this.cPlayer} wins!`);
            this.gameOver = true;
        } else if (this.state.every((cell) => cell)) {
            this.uMessage("It's a tie!");
            this.gameOver = true;
        } else {
            // Switch players
            this.cPlayer = this.cPlayer === "X" ? "O" : "X";
            this.uMessage(`Player ${this.cPlayer}'s turn`);
        }
    },

    // Check if there's a winning combination
    checkWin() {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6], // Diagonals
        ];
        return wins.find((combo) =>
            combo.every((i) => this.state[i] === this.cPlayer)
        );
    },

    // Highlight winning cells
    highlight(combo) {
        combo.forEach((i) => {
            document.getElementById("board").children[i].style.color = "red";
        });
    },

    // Reset the game
    reset() {
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.gameOver = false;
        this.cBoard();
    },

    // Update the game status message
    uMessage(msg) {
        document.getElementById("message").textContent = msg;
    },
};

// Start the game
TicTac.init();