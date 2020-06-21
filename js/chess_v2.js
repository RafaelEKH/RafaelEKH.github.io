
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
let nextToMove = "white";
const toggleNext = () => {
    if (nextToMove == "white") {
        nextToMove = "black";
    } else if (nextToMove == "black") {
        nextToMove = "white";
    }
}

const pieceSelector = (event) => {
    let theClass = event.target.className;
    //first selection
    if (!pieceIsSelected) {
        if (theClass.search(`${nextToMove}piece`) != -1) {
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

let legals = []; //array for the legal moves

const idToNumber = (id) => {
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

const numberToId = (numId) => {
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
    let friendOrFoe = []; // e.g. ["white" , "black" , "movement direction", "starting row" , "capture right", "capture left"] first is same color as the selected piece
    if (selected[0] == "white") {
        friendOrFoe = ["white" , "black" , 1 , 2 , 11 , -9 ];
    } else if (selected[0] == "black") {
        friendOrFoe = ["black" , "white", -1 , 7 , 9 , -11 ];
    }
    if (selected[2][1] == friendOrFoe[3] ) {
        if (checkIfOccupied(numberToId((idToNumber(selected[2]) + friendOrFoe[2] ))) == "not occupied") { //one step from starting the row
            legals.push(numberToId((idToNumber(selected[2]) + friendOrFoe[2] )));
            if (checkIfOccupied(numberToId((idToNumber(selected[2]) + 2 * friendOrFoe[2] ))) == "not occupied") { //two steps from starting the row
                legals.push(numberToId((idToNumber(selected[2]) + 2 * friendOrFoe[2] )));
            }
        }
        if (checkIfOccupied(numberToId((idToNumber(selected[2]) + friendOrFoe[4]))) == friendOrFoe[1]) { //capturing from the first row
            legals.push(numberToId((idToNumber(selected[2]) + friendOrFoe[4])));
        }
        if (checkIfOccupied(numberToId((idToNumber(selected[2]) + friendOrFoe[5] ))) == friendOrFoe[1]) {
            legals.push(numberToId((idToNumber(selected[2]) + friendOrFoe[5] )));
        }
    } else {
        if (checkIfOccupied(numberToId((idToNumber(selected[2]) + friendOrFoe[2]))) == "not occupied") { //advancing 1 step if it's not occupied
            legals.push(numberToId((idToNumber(selected[2]) + friendOrFoe[2])));
        }
        if (checkIfOccupied(numberToId((idToNumber(selected[2]) + friendOrFoe[4]))) == friendOrFoe[1]) { //capturing if possible
            legals.push(numberToId((idToNumber(selected[2]) + friendOrFoe[4])));
        }
        if (checkIfOccupied(numberToId((idToNumber(selected[2]) + friendOrFoe[5]))) == friendOrFoe[1]) {
            legals.push(numberToId((idToNumber(selected[2]) + friendOrFoe[5])));
        }
    }    
}

const calcLegalsKingOrKnight = (selected) => {
    let kingOrKnight = []; /* ["opposing color" , ["possible legal moves array"] ] */
    if (selected[0] == "white" && selected[1] == 2) { 
        kingOrKnight = ["black" , [21, 12, 19, 8, -12, -21, -19, -8]]; /*white knight*/
    } else if (selected[0] == "black" && selected[1] == 2) { 
        kingOrKnight = ["white" , [21, 12, 19, 8, -12, -21, -19, -8]]; /*black knight*/
    } else if (selected[0] == "white" && selected[1] == 5) { 
        kingOrKnight = ["black" , [10, 11, 1, -9, -10, -11, -1, 9]]; /*white king*/
    } else if (selected[0] == "black" && selected[1] == 5) { 
        kingOrKnight = ["white" , [10, 11, 1, -9, -10, -11, -1, 9]]; /*black king*/
    }
    let legalCandidates = [];
    let length = kingOrKnight[1].length;
    for (let i=0 ; i<length ; i++) {
        legalCandidates.push( numberToId ( ( idToNumber( selected[2] ) + kingOrKnight[1][i]) ) );
    }
    let i;
    for (i of legalCandidates) {
        if (checkIfOccupied(i) == "not occupied") {
            legals.push(i);
        }
        else if (checkIfOccupied(i) == kingOrKnight[0]) {
            legals.push(i)
        }
    }
}

//collects legal tiles in any direction starting from the selected piece.
const calcDirection = ( selected , directionNumber ) => { //directionNumber help: top = 1 , top-right = 11 , right = 10 , bottom-right = 9 , bottom = -1 , bottom-left = -11 , left = -10 , top-left = -9
    let whileSwitch = true;
    let candidateTile = idToNumber( selected[2] ) + directionNumber; //the first tile in the direction
    let friendOrFoe = []; // e.g. ["white" , "black" ] first is same color as the selected piece
    if (selected[0] == "white") {
        friendOrFoe = ["white" , "black"];
    } else if (selected[0] == "black") {
        friendOrFoe = ["black" , "white"];
    }
    while ( whileSwitch ) {
        if ( checkIfOccupied( numberToId( candidateTile ) ) == "not occupied" ) { //candidate is empty therefore its legal
            legals.push( numberToId( candidateTile ) );
            candidateTile += directionNumber;
        } else if ( checkIfOccupied( numberToId( candidateTile ) ) == friendOrFoe[1] ) { //candidate is occupied by an opposing color piece so its legal but break the loop
            legals.push( numberToId( candidateTile ) );
            whileSwitch = false;
        } else if ( checkIfOccupied( numberToId( candidateTile ) ) == friendOrFoe[0] ) { //candidate is occupied by same color piece so the tile is not legal and break the loop
            whileSwitch = false;
        } else if ( numberToId( candidateTile ) == null ) { //tile is out of the board, break the loop
            whileSwitch = false;
        }
    }
}

const calcLegalsBishops = (selected) => {
    calcDirection(selected, 11);
    calcDirection(selected, -11);
    calcDirection(selected, 9);
    calcDirection(selected, -9);
}

const calcLegalsRooks = (selected) => {
    calcDirection(selected, 10);
    calcDirection(selected, -10);
    calcDirection(selected, 1);
    calcDirection(selected, -1);
}

const calcLegalsQueens = (selected) => {
    calcLegalsRooks(selected);
    calcLegalsBishops(selected);
    
}

const calcLegals = (selected) => {
    switch(selected[1]) {
        case 0: calcLegalsPawns(selected);
        break;
        case 1: calcLegalsRooks(selected);
        break;
        case 2: calcLegalsKingOrKnight(selected);
        break;
        case 3: calcLegalsBishops(selected);
        break;
        case 4: calcLegalsQueens(selected);
        break;
        case 5: calcLegalsKingOrKnight(selected);
        break;
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
                document.querySelector(`#${event.target.id}`).appendChild(thePiece); //relocate piece
                document.querySelector(".highlight").remove();
                toggleNext();
                return;
            }
            document.querySelector(`#${event.target.id}`).appendChild(thePiece); //relocate piece
            document.querySelector(".highlight").remove();
            pieceIsSelected = false;
            legals = [];
            toggleNext();
            //target is a legal occupied tile.
        } else if (legals.indexOf(event.target.parentElement.id) != -1) {
            document.querySelector(`#${event.target.parentElement.id}`).appendChild(thePiece); //relocate piece
            document.querySelector(`#${event.target.parentElement.id}`).removeChild(document.querySelector(`#${event.target.parentElement.id}`).firstChild); //remove  old piece
            document.querySelector(".highlight").remove();
            pieceIsSelected = false;
            legals = [];
            toggleNext();                      
        }
    } else if (event.target.className.search(selectedPiece[0]) == -1) { //target not legal nor is not a same color piece, but anything else
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
    } else {
        pieceSelector(e);
    }
});

window.addEventListener("touchstart", e => {
    if (pieceIsSelected) {
        movePiece(e);
    } else {
        pieceSelector(e);
    }
});