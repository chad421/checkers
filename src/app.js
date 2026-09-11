const gameContainer = document.getElementById("checker-board")
const SLOTS = 64



/*
VIEW
*/

function createBoard() {

    // Generate board and id values
    for(let i = 0; i < SLOTS; i++) {
        // Template variables to populate game container
        const slot = document.createElement("div")
        const peice = document.createElement("a")

        // Calculates row and column from a 
        const numRows = Math.sqrt(SLOTS)
        const row = Math.floor(i/numRows)
        const col = i % numRows

        // assign coordinate to slot id: A1, H3, B2, etc.
        switch(row) {
            case 0:
                slot.id = `H${col + 1}`
                break;
            case 1:
                slot.id = `G${col + 1}`
                break;
            case 2:
                slot.id = `F${col + 1}`
                break;
            case 3:
                slot.id = `E${col + 1}`
                break;
            case 4:
                slot.id = `D${col + 1}`
                break;
            case 5:
                slot.id = `C${col + 1}`
                break;
            case 6:
                slot.id = `B${col + 1}`
                break;
            case 7:
                slot.id = `A${col + 1}`
                break;
            default:
                alert("Something has gone very, very wrong")
        }

        if((row + col) % 2 == 0) {
            slot.className = "slot slot-light"
        } else {
            slot.className = "slot slot-dark"
        }

        if((i <= 24) && (row + col) % 2 == 0) {
            peice.className = "peice peice-dark"
            slot.append(peice)
        }

        if((i >= 40) && (row + col) % 2 != 0) {
            peice.className = "peice peice-light"
            slot.append(peice)
        }

        gameContainer.append(slot)
    }


    // Add event listener for board
    gameContainer.addEventListener("click", function (e) {
        /*
        e.target returns deepest nested item clicked
        e.currentTarget returns a copy of the parents element
        */

        console.log(e.target.closest("div"))
        
    })
}

createBoard()