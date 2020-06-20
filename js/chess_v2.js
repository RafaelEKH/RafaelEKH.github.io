
const createPiece = (targetArray, fa_piecename, piececolor) => {
    let length = targetArray.length //for better performance 
    for (let i = 0; i < length; i++) {
        let piece = document.createElement("i");
        piece.className = `${fa_piecename} ${piececolor} piece`;
        document.querySelector(`#${targetArray[i]}`).appendChild(piece);
    }
}

let piecesAreSet = false;

const setThePieces = () => {
    if (!piecesAreSet) {
        //white pieces
        createPiece(["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"], "fas fa-chess-pawn", "whitepiece");
        createPiece(["a1", "h1"], "fas fa-chess-rook", "whitepiece");
        createPiece(["b1", "g1"], "fas fa-chess-knight", "whitepiece");
        createPiece(["c1", "f1"], "fas fa-chess-bishop", "whitepiece");
        createPiece(["d1"], "fas fa-chess-queen", "whitepiece");
        createPiece(["e1"], "fas fa-chess-king", "whitepiece");
        //black pieces
        createPiece(["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"], "fas fa-chess-pawn", "blackpiece");
        createPiece(["a8", "h8"], "fas fa-chess-rook", "blackpiece");
        createPiece(["b8", "g8"], "fas fa-chess-knight", "blackpiece");
        createPiece(["c8", "f8"], "fas fa-chess-bishop", "blackpiece");
        createPiece(["d8"], "fas fa-chess-queen", "blackpiece");
        createPiece(["e8"], "fas fa-chess-king", "blackpiece");
        //deactivate button
        document.getElementById("piecesetter").innerHTML = "The pieces are set!"
        piecesAreSet = true;
    }
}

function testpiece() {
    createPiece(["d4", "h8"], "fas fa-chess-queen", "whitepiece");
    createPiece(["f2"], "fas fa-chess-queen", "blackpiece");
    createPiece(["c5"], "fas fa-chess-queen", "whitepiece");
}

let pieceIsSelected = false;
let selectedPiece = []; //selectedPiece format ["color", piecetype number , "placed tile id"] e.g. ["white", 0 , "e4"]

const pieceNameFinder = (theClass) => {
    if (theClass.search("pawn") != -1) {
        selectedPiece[1] = 0;
        return;
    } else if (theClass.search("rook") != -1) {
        selectedPiece[1] = 1;
        return;
    } else if (theClass.search("knight") != -1) {
        selectedPiece[1] = 2;
        return;
    } else if (theClass.search("bishop") != -1) {
        selectedPiece[1] = 3;
        return;
    } else if (theClass.search("queen") != -1) {
        selectedPiece[1] = 4;
        return;
    } else if (theClass.search("king") != -1) {
        selectedPiece[1] = 5;
        return;
    }
}

let thePiece; //store the selected piece for later use in moving it

const pieceSelector = (event) => {
    let theClass = event.target.className;
    //first selection
    if (!pieceIsSelected) {
        if (theClass.search("piece") != -1) {
            if (theClass.search("whitepiece") != -1) {
                selectedPiece = ["white"];
            } else if (theClass.search("blackpiece") != -1) {
                selectedPiece = ["black"];
            }
            pieceNameFinder(theClass);
            selectedPiece.push(event.target.parentElement.id);
            pieceIsSelected = true;
            highlightSelectedTile(selectedPiece);
            firstSelect = selectedPiece[2];
            thePiece = event.target; //store the selected piece for later use in moving it
            calcLegals(selectedPiece);
            return;
        }
        //select other but not the same but also same color
    } else if (selectedPiece && selectedPiece[2] != event.target.parentElement.parentElement.id && theClass.search(selectedPiece[0]) != -1) {
        let firstSelect = selectedPiece[2];
        document.querySelector(`#${firstSelect}`).appendChild(document.querySelector(".highlight").firstChild);
        document.querySelector(`.highlight`).remove();
        selectedPiece[2] = event.target.parentElement.id;
        pieceNameFinder(theClass);
        highlightSelectedTile(selectedPiece);
        thePiece = event.target; //store the selected piece for later use in moving it
        calcLegals(selectedPiece);
        return;
        //select same piece second time to remove selection
    } else if (selectedPiece && selectedPiece[2] == event.target.parentElement.parentElement.id) {
        let firstSelect = selectedPiece[2];
        document.querySelector(`#${firstSelect}`).appendChild(document.querySelector(".highlight").firstChild);
        document.querySelector(`.highlight`).remove();
        selectedPiece = null;
        pieceIsSelected = false;
        legals = [];
    }
}

let legals = [];

const pieceIdConverter = (id) => {
    if (id[0] == "a") {
        return parseInt("1" + id[1]);
    }
    else if (id[0] == "b") {
        return parseInt("2" + id[1]);
    }
    else if (id[0] == "c") {
        return parseInt("3" + id[1]);
    }
    else if (id[0] == "d") {
        return parseInt("4" + id[1]);
    }
    else if (id[0] == "e") {
        return parseInt("5" + id[1]);
    }
    else if (id[0] == "f") {
        return parseInt("6" + id[1]);
    }
    else if (id[0] == "g") {
        return parseInt("7" + id[1]);
    }
    else if (id[0] == "h") {
        return parseInt("8" + id[1]);
    }
}

const numIdConverter = (numId) => {
    numId = numId.toString();
    if (parseInt(numId[0]) > 8 || parseInt(numId[1]) > 8 || parseInt(numId[0]) < 1 || parseInt(numId[1]) < 1 || numId[1] == undefined) {
        return null;
    }
    else if (numId[0] == "1") {
        return "a" + numId[1];
    }
    else if (numId[0] == "2") {
        return "b" + numId[1];
    }
    else if (numId[0] == "3") {
        return "c" + numId[1];
    }
    else if (numId[0] == "4") {
        return "d" + numId[1];
    }
    else if (numId[0] == "5") {
        return "e" + numId[1];
    }
    else if (numId[0] == "6") {
        return "f" + numId[1];
    }
    else if (numId[0] == "7") {
        return "g" + numId[1];
    }
    else if (numId[0] == "8") {
        return "h" + numId[1];
    }
}

const checkIfOccupied = (id) => {
    if (id == null) {
        return;
    }
    else if (document.querySelector(`#${id}`).hasChildNodes()) {
        if (document.querySelector(`#${id}`).firstChild.className.search("white") != -1) {
            return "white";
        } else if (document.querySelector(`#${id}`).firstChild.className.search("black") != -1) {
            return "black";
        }
    } else {
        return "not occupied";
    }
}

const calcLegalsPawns = (selected) => {
    if (selected[0] == "white") {
        if (selected[2][1] == "2") {
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) + 1))) == "not occupied") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) + 1)));
                if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) + 2))) == "not occupied") {
                    legals.push(numIdConverter((pieceIdConverter(selected[2]) + 2)));
                }
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) + 11))) == "black") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) + 11)));
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) - 9))) == "black") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) - 9)));
            }
        } else {
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) + 1))) == "not occupied") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) + 1)));
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) + 11))) == "black") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) + 11)));
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) - 9))) == "black") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) - 9)));
            }
        }
    } else if (selected[0] == "black") {
        if (selected[2][1] == "7") {
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) - 1))) == "not occupied") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) - 1)));
                if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) - 2))) == "not occupied") {
                    legals.push(numIdConverter((pieceIdConverter(selected[2]) - 2)));
                }
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) - 11))) == "white") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) - 11)));
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) + 9))) == "white") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) + 9)));
            }
        } else {
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) - 1))) == "not occupied") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) - 1)));
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) - 11))) == "white") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) - 11)));
            }
            if (checkIfOccupied(numIdConverter((pieceIdConverter(selected[2]) + 9))) == "white") {
                legals.push(numIdConverter((pieceIdConverter(selected[2]) + 9)));
            }
        }
    }
}

const calcLegalsKnights = (selected) => {
    let knightNumbers = [21, 12, 19, 8, -12, -21, -19, -8];
    if (selected[0] == "white") {
        let legalKinghtCandidates = [];
        let length = knightNumbers.length;
        for (let i=0 ; i<length ; i++) {
            legalKinghtCandidates.push( numIdConverter ( ( pieceIdConverter( selected[2] ) + knightNumbers[i]) ) );
        }
        let i;
        for (i of legalKinghtCandidates) {
            if (checkIfOccupied(i) == "not occupied") {
                legals.push(i);
            }
            else if (checkIfOccupied(i) == "black") {
                legals.push(i)
            }
        }
    } else if (selected[0] == "black") {
        let legalKinghtCandidates = [];
        let length = knightNumbers.length;
        for (let i=0 ; i<length ; i++) {
            legalKinghtCandidates.push( numIdConverter ( ( pieceIdConverter( selected[2] ) + knightNumbers[i]) ) );
        }
        let i;
        for (i of legalKinghtCandidates) {
            if (checkIfOccupied(i) == "not occupied") {
                legals.push(i);
            }
            else if (checkIfOccupied(i) == "white") {
                legals.push(i)
            }
        }
    }
}

const calcLegalsBishops = (selected) => {
    if (selected[0] == "white") {
        let topRightDiagonal = true;
        let candidate = pieceIdConverter( selected[2] ) + 11;
        while ( topRightDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate+=11;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                topRightDiagonal = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                topRightDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                topRightDiagonal = false;
            }
        }
        let topLeftDiagonal = true;
        candidate = pieceIdConverter( selected[2] ) - 9;
        while ( topLeftDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate-=9;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                topLeftDiagonal = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                topLeftDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                topLeftDiagonal = false;
            }
        }
        let bottomLeftDiagonal = true;
        candidate = pieceIdConverter( selected[2] ) - 11;
        while ( bottomLeftDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate-=11;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                bottomLeftDiagonal = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                bottomLeftDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                bottomLeftDiagonal = false;
            }
        }
        let bottomRightDiagonal = true;
        candidate = pieceIdConverter( selected[2] ) + 9;
        while ( bottomRightDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate+=9;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                bottomRightDiagonal = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                bottomRightDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                bottomRightDiagonal = false;
            }
        }
    } else if (selected[0] == "black") {
        let topRightDiagonal = true;
        let candidate = pieceIdConverter( selected[2] ) + 11;
        while ( topRightDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate+=11;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                topRightDiagonal = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                topRightDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                topRightDiagonal = false;
            }
        }
        let topLeftDiagonal = true;
        candidate = pieceIdConverter( selected[2] ) - 9;
        while ( topLeftDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate-=9;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                topLeftDiagonal = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                topLeftDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                topLeftDiagonal = false;
            }
        }
        let bottomLeftDiagonal = true;
        candidate = pieceIdConverter( selected[2] ) - 11;
        while ( bottomLeftDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate-=11;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                bottomLeftDiagonal = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                bottomLeftDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                bottomLeftDiagonal = false;
            }
        }
        let bottomRightDiagonal = true;
        candidate = pieceIdConverter( selected[2] ) + 9;
        while ( bottomRightDiagonal ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate+=9;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                bottomRightDiagonal = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                bottomRightDiagonal = false;
            } else if ( numIdConverter( candidate ) == null ) {
                bottomRightDiagonal = false;
            }
        }
    }
}

const calcLegalsRooks = (selected) => {
    if (selected[0] == "white") {
        let right = true;
        let candidate = pieceIdConverter( selected[2] ) + 10;
        while ( right ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate+=10;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                right = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                right = false;
            } else if ( numIdConverter( candidate ) == null ) {
                right = false;
            }
        }
        let left = true;
        candidate = pieceIdConverter( selected[2] ) - 10;
        while ( left ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate-=10;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                left = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                left = false;
            } else if ( numIdConverter( candidate ) == null ) {
                left = false;
            }
        }
        let up = true;
        candidate = pieceIdConverter( selected[2] ) + 1;
        while ( up ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate+=1;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                up = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                up = false;
            } else if ( numIdConverter( candidate ) == null ) {
                up = false;
            }
        }
        let down = true;
        candidate = pieceIdConverter( selected[2] ) - 1;
        while ( down ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate -= 1;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                legals.push( numIdConverter( candidate ) );
                down = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                down = false;
            } else if ( numIdConverter( candidate ) == null ) {
                down = false;
            }
        }
    } else if (selected[0] == "black") {
        let right = true;
        let candidate = pieceIdConverter( selected[2] ) + 10;
        while ( right ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate+=10;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                right = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                right = false;
            } else if ( numIdConverter( candidate ) == null ) {
                right = false;
            }
        }
        let left = true;
        candidate = pieceIdConverter( selected[2] ) - 10;
        while ( left ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate-=10;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                left = false;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                left = false;
            } else if ( numIdConverter( candidate ) == null ) {
                left = false;
            }
        }
        let up = true;
        candidate = pieceIdConverter( selected[2] ) + 1;
        while ( up ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate += 1;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                up = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                up = false;
            } else if ( numIdConverter( candidate ) == null ) {
                up = false;
            }
        }
        let down = true;
        candidate = pieceIdConverter( selected[2] ) - 1;
        while ( down ) {
            if ( checkIfOccupied( numIdConverter( candidate ) ) == "not occupied" ) {
                legals.push( numIdConverter( candidate ) );
                candidate -= 1;
            } else if ( checkIfOccupied( numIdConverter( candidate ) ) == "white" ) {
                legals.push( numIdConverter( candidate ) );
                down = false;
            }  else if ( checkIfOccupied( numIdConverter( candidate ) ) == "black" ) {
                down = false;
            } else if ( numIdConverter( candidate ) == null ) {
                down = false;
            }
        }
    }
}

const calcLegalsKings = (selected) => {
    let kingNumbers = [10, 11, 1, -9, -10, -11, -1, 9];
    if (selected[0] == "white") {
        let legalKingCandidates = [];
        let length = kingNumbers.length;
        for (let i=0 ; i<length ; i++) {
            legalKingCandidates.push( numIdConverter ( ( pieceIdConverter( selected[2] ) + kingNumbers[i]) ) );
        }
        let i;
        for (i of legalKingCandidates) {
            if (checkIfOccupied(i) == "not occupied") {
                legals.push(i);
            }
            else if (checkIfOccupied(i) == "black") {
                legals.push(i)
            }
        }
    } else if (selected[0] == "black") {
        let legalKingCandidates = [];
        let length = kingNumbers.length;
        for (let i=0 ; i<length ; i++) {
            legalKingCandidates.push( numIdConverter ( ( pieceIdConverter( selected[2] ) + kingNumbers[i]) ) );
        }
        let i;
        for (i of legalKingCandidates) {
            if (checkIfOccupied(i) == "not occupied") {
                legals.push(i);
            }
            else if (checkIfOccupied(i) == "white") {
                legals.push(i)
            }
        }
    }
}

const calcLegalsQueens = (selected) => {
    calcLegalsRooks(selected);
    calcLegalsBishops(selected);
    
}

const calcLegals = (selected) => {
    if (selected[1] == 0) {
        calcLegalsPawns(selected);
    }
    else if (selected[1] == 1) {
        calcLegalsRooks(selected);
    }
    else if (selected[1] == 2) {
        calcLegalsKnights(selected);
    }
    else if (selected[1] == 3) {
        calcLegalsBishops(selected);
    }
    else if (selected[1] == 4) {
        calcLegalsQueens(selected);
    }
    else if (selected[1] == 5) {
        calcLegalsKings(selected);
    }

}

const movePiece = (event) => {
    if (pieceIsSelected && (legals.indexOf(event.target.id) != -1 || legals.indexOf(event.target.parentElement.id) != -1)) {
        //if its a legal empty tile.
        if (legals.indexOf(event.target.id) != -1) {
            if (document.querySelector(`#${event.target.id}`).firstChild != null) { //if you click an occupied legal tile instead of the piece this removes the piece and proceed as it was empty to begin with
                document.querySelector(`#${event.target.id}`).removeChild(document.querySelector(`#${event.target.id}`).firstChild);
                pieceIsSelected = false;
                legals = [];
            }
            document.querySelector(`#${event.target.id}`).appendChild(thePiece); //relocate piece
            document.querySelector(".highlight").remove();
            pieceIsSelected = false;
            legals = [];
            //target is a legal occupied tile.
        } else if (legals.indexOf(event.target.parentElement.id) != -1) {
            document.querySelector(`#${event.target.parentElement.id}`).appendChild(thePiece); //relocate piece
            document.querySelector(`#${event.target.parentElement.id}`).removeChild(document.querySelector(`#${event.target.parentElement.id}`).firstChild); //remove  old piece
            document.querySelector(".highlight").remove();
            pieceIsSelected = false;
            legals = [];
                      
        }
    } else if (event.target.className.search(selectedPiece[0]) == -1) { //target is not a same color piece but anything else
        pieceIsSelected = false;
        document.querySelector(".highlight").remove();
        document.querySelector(`#${selectedPiece[2]}`).appendChild(thePiece);
        selectedPiece =  [];
        legals = [];
    } else if (event.target.className.search(selectedPiece[0]) != -1) { //targeted piece is the same color as the selected
        pieceSelector(event);
    }
}

let highLightDiv = document.createElement("div");
highLightDiv.className = "highlight";

const highlightSelectedTile = (selected) => {
    let piece = event.target;
    highLightDiv.appendChild(piece);
    document.getElementById(selected[2]).appendChild(highLightDiv);
}

function restart() {
    if (piecesAreSet)
    alert("restart function placeholder");
}


window.addEventListener("click", e => {
    if (pieceIsSelected) {
        movePiece(e);
    } else /*if (!pieceIsSelected)*/ {
        pieceSelector(e);
    }
});

window.addEventListener("touchstart", e => {
    if (pieceIsSelected) {
        movePiece(e);
    } else /*if (!pieceIsSelected)*/ {
        pieceSelector(e);
    }
});