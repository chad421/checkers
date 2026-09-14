const gameContainer = document.getElementById("checker-board")
const SLOTS = 64
let count = 1



/*
VIEW
*/

function createBoard() {

    // Generate board and id values
    for(let i = 0; i < SLOTS; i++) {
        // Template elements to populate game container
        const slot = document.createElement("div")
        const piece = document.createElement("a")

        // Slot ids are 1-65 (64 slots, 8x8)
        slot.id = i + 1

        // Calculates row and column from a 1D array
        const numRows = Math.sqrt(SLOTS)
        const row = Math.floor(i/numRows)
        const col = i % numRows

        // Checkerboard math pattern generated 
        if((row + col) % 2 == 0) {
            slot.className = "slot slot-light"
        } else {
            slot.className = "slot slot-dark"
        }

        // Sets the top pieces to dark, bottom pieces to light
        if((i <= 24) && (row + col) % 2 == 0) {
            piece.className = "piece piece-dark"
            slot.append(piece)
        }

        if((i >= 40) && (row + col) % 2 != 0) {
            piece.className = "piece piece-light"
            slot.append(piece)
        }

        gameContainer.append(slot)
    }


    // Add event listener for board
    gameContainer.addEventListener("click", function (e) {
        const clicked = e.target.closest("div")
        
        // Checks if peice is on the slot clicked
        if(!clicked.querySelector("a")) {
            console.log("invalid click")
        }

        // How many spaces from a peice to move left or right
        const SPACES_LEFT = Number(clicked.id) + 7
        const SPACES_RIGHT = Number(clicked.id) + 9

        // Checks if peice is on the edge
        if(Number(clicked.id) % 8 === 0) {
            console.log("You clicked a slot on the rightmost edge!")
        } else if (Number(clicked.id) % 8 === 1) {
            console.log("You clicked on a slot on the leftmost edge!")
        }

    })
}

createBoard()