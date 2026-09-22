const gameContainer = document.getElementById("checker-board")
let lightPoints = document.getElementById("light-points")
let darkPoints = document.getElementById("dark-points")

const SLOTS = 64

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

        // Checks if slot/<div> is ready to move a piece
        if(clicked.style.backgroundColor === "lightblue") {
            const clickedId = clicked.id
            const checkLeft = document.getElementById(String(clickedId - 2))
            const checkRight = document.getElementById(String(Number(clickedId) + 2))

            // Clears clicked/selected/"lightblue" slots
            clicked.style.backgroundColor = ""
            checkLeft.style.backgroundColor = ""
            checkRight.style.backgroundColor = ""

            // Selects old piece, makes new piece
            const oldPiece = document.getElementById("old-piece")
            const newPiece = document.createElement("a")
            
            if(oldPiece.className === "piece piece-light") {
                newPiece.className = "piece piece-light"
            }

            if(oldPiece.className === "piece piece-dark") {
                newPiece.className = "piece piece-dark"
            }

            if(clicked.firstElementChild != newPiece && clicked.firstElementChild != null) {
                clicked.firstElementChild.remove()
                if(newPiece.className === "piece light-piece"){
                    lightPoints.innerHTML = "1"
                } else {
                    darkPoints.innerHTML = "1"
                }
            }

            clicked.append(newPiece)

            oldPiece.remove()

            return
        }
        
        // Checks if no piece/<a> is on the slot/<div> clicked and returns
        if(!clicked.querySelector("a")) {
            console.log("invalid click")
            return
        }

        // Sets piece id to old-piece, to remember which one to delete when the piece is moved
        clickedPiece.id = "old-piece"

        // Spaces left and right relative to a dark piece
        let SPACES_LEFT = Number(clicked.id) + 7
        let SPACES_RIGHT = Number(clicked.id) + 9

        // Flip logic if white piece
        if(clickedPiece.className === "piece piece-light") {
            SPACES_LEFT = Number(clicked.id) - 9
            SPACES_RIGHT = Number(clicked.id) - 7
        }

        // Select movable slots to left and right of clicked slot
        const leftSlot = document.getElementById(String(SPACES_LEFT))
        const rightSlot = document.getElementById(String(SPACES_RIGHT))
        const leftPiece = leftSlot.firstElementChild
        const rightPiece = rightSlot.firstElementChild

        // Checks if piece is on the right edge and empty, highlights left slot
        if(leftSlot.firstElementChild === null && Number(clicked.id) % 8 === 0) {
            console.log("You clicked a slot on the rightmost edge!")
            leftSlot.style.backgroundColor = "lightblue"
            return
        }

        // Checks if piece is on the left edge and empty, hightlights right slot
        if(rightSlot.firstElementChild === null && Number(clicked.id) % 8 === 1) {
            console.log("You clicked on a slot on the leftmost edge!")
            rightSlot.style.backgroundColor = "lightblue"
            return
        }

        // Checks if both slots are null, highlights both slots
        if(leftSlot.firstElementChild === null && rightSlot.firstElementChild === null) {
            console.log("Both slots null!")
            leftSlot.style.backgroundColor = "lightblue"
            rightSlot.style.backgroundColor = "lightblue"
            return
        }

        // Checks if there is an opposing color piece and highlights the slot if so
        if(clickedPiece.className === "piece piece-dark" && rightPiece.className === "piece piece-light") {
            rightSlot.style.backgroundColor = "lightblue"
        }

        if(clickedPiece.className === "piece piece-dark" && leftPiece.className === "piece piece-light") {
            leftSlot.style.backgroundColor = "lightblue"
        }
    })
}

createBoard()