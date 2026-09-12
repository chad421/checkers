const gameContainer = document.getElementById("checker-board")
const SLOTS = 64
let count = 1



/*
VIEW
*/

function createBoard() {

    // Generate board and id values
    for(let i = 0; i < SLOTS; i++) {
        // Template variables to populate game container
        const slot = document.createElement("div")
        const piece = document.createElement("a")

        slot.id = i + 1

        // Calculates row and column from a 
        const numRows = Math.sqrt(SLOTS)
        const row = Math.floor(i/numRows)
        const col = i % numRows


        if((row + col) % 2 == 0) {
            slot.className = "slot slot-light"
        } else {
            slot.className = "slot slot-dark"
        }

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
        /*
        e.target returns deepest nested item clicked
        e.currentTarget returns a copy of the parents element
        */

        const clicked = e.target.closest("div")

        // Checks if a peice is not on the clicked slot
        if(!clicked.querySelector("a")) {
            console.log("invalid click")
        } else {
            console.log("valid click!")
        }

        // Checks if slot is on the edge
        if(Number(clicked.id) % 8 === 0) {
            console.log("You clicked a slot on the rightmost edge!")
        } else if (Number(clicked.id) % 8 === 1) {
            console.log("You clicked on a slot on the leftmost edge!")
        }

    })
}

createBoard()