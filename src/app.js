const gameContainer = document.getElementById("checker-board")
const SLOTS = 64
let count = 1

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

        // Sets top pieces to dark
        if((i <= 23) && (row + col) % 2 != 0) {
            piece.className = "piece piece-dark"
            slot.append(piece)
        }

        // Sets bottom pieces to light
        if((i >= 40) && (row + col) % 2 != 0) {
            piece.className = "piece piece-light"
            slot.append(piece)
        }

        gameContainer.append(slot)
    }


    // Add event listener for board
    gameContainer.addEventListener("click", function (e) {
        const clicked = e.target.closest("div")
        const clickedPiece = clicked.firstElementChild

        /* NEW CODE */

        // Checks if slot/<div> is ready to move a peice
        if(clicked.style.backgroundColor === "lightblue") {
            const clickedId = clicked.id

            console.log(Number(clickedId) + 2)
            // Check spots to the left and right if they are also selected
            const checkLeft = document.getElementById(String(clickedId - 2))
            const checkRight = document.getElementById(String(Number(clickedId) + 2))

            console.log(checkLeft)
            console.log(checkRight)

            if(checkLeft.style.backgroundColor === "lightblue") {
                checkLeft.style.backgroundColor = ""
            } 
            if (checkRight.style.backgroundColor === "lightblue") {
                checkRight.style.backgroundColor = ""
            }

            clicked.style.backgroundColor = ""


            const oldId = clicked.id - 7
            const oldSlot = document.getElementById(String(oldId))
            const oldPiece = oldSlot.firstElementChild
            const newPiece = document.createElement("a")
            newPiece.className = "piece piece-dark"

            clicked.append(newPiece)

            oldPiece.remove()

            return
        }

        /* END NEW CODE */
        
        // Checks if peice/<a> is on the slot/<div> clicked
        if(!clicked.querySelector("a")) {
            console.log("invalid click")
            return
        }

        // Spaces left and right relative to a dark piece
        let SPACES_LEFT = Number(clicked.id) + 7
        let SPACES_RIGHT = Number(clicked.id) + 9

        // Flip logic if white piece
        if(clickedPiece.className === "piece piece-light") {
            SPACES_LEFT = Number(clicked.id) - 9
            SPACES_RIGHT = Number(clicked.id) - 7
        }

        // Select slots to left and right of clicked slot
        const leftSlot = document.getElementById(String(SPACES_LEFT))
        const rightSlot = document.getElementById(String(SPACES_RIGHT))

        // Checks if peice is on the right edge
        if(Number(clicked.id) % 8 === 0) {
            console.log("You clicked a slot on the rightmost edge!")
            leftSlot.style.backgroundColor = "lightblue"
            return
        }

        // Checks if peice is on the left edge
        if (Number(clicked.id) % 8 === 1) {
            console.log("You clicked on a slot on the leftmost edge!")
            rightSlot.style.backgroundColor = "lightblue"
            return
        }

        // Checks if clicking an available/lightblue slot
        if(clicked.style.backgroundColor === "lightblue") {
            console.log("clicked a light blue square")
        }

        // Not an edge piece, show both valid moves
        leftSlot.style.backgroundColor = "lightblue"
        rightSlot.style.backgroundColor = "lightblue"
    })
}

createBoard()