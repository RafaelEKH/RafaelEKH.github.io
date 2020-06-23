const createPiece = (targetArray, fa_piecename, piececolor) => {
    let length = targetArray.length //for better performance 
    for (let i = 0; i < length; i++) {
        let piece = document.createElement("i");
        piece.className = `${fa_piecename} ${piececolor} piece`;
        piece.style.visibility = "hidden";
        document.querySelector(`#${targetArray[i]}`).appendChild(piece);
    }
}

let piecesAreSet = false;

const revealPieces = () => {
    if (!piecesAreSet) {
        pieces = document.querySelectorAll("i.fas");
        length = pieces.length;
        for (i=0 ; i<length ; i++) {
            pieces[i].style.visibility = "visible";
        }
        positionPieces();
        piecesAreSet = true;
        document.getElementById("piecesetter").innerHTML = "Restart";
    } else {
        restart();
    }
}

const setThePieces = () => {
    let damas8 = [
        ["2", "1", "white"],
        ["7", "8", "black"]
    ];
    for (i=0; i<2; i++) {
        createPiece([`a${damas8[i][0]}`, `b${damas8[i][0]}`, `c${damas8[i][0]}`, `d${damas8[i][0]}`, `e${damas8[i][0]}`, `f${damas8[i][0]}`, `g${damas8[i][0]}`, `h${damas8[i][0]}`], `fas fa-chess-pawn`, `${damas8[i][2]}piece`);
        createPiece([`a${damas8[i][1]}`, `h${damas8[i][1]}`], `fas fa-chess-rook`, `${damas8[i][2]}piece`);
        createPiece([`b${damas8[i][1]}`, `g${damas8[i][1]}`], `fas fa-chess-knight`, `${damas8[i][2]}piece`);
        createPiece([`c${damas8[i][1]}`, `f${damas8[i][1]}`], `fas fa-chess-bishop`, `${damas8[i][2]}piece`);
        createPiece([`d${damas8[i][1]}`], `fas fa-chess-queen`, `${damas8[i][2]}piece`);
        createPiece([`e${damas8[i][1]}`], `fas fa-chess-king`, `${damas8[i][2]}piece`);
    }
}

setThePieces();

let tileHeight = document.querySelector(".mezo").offsetHeight;
let pieces = document.querySelectorAll("i.fas");

const setPieceHeight = () => {
    tileHeight = document.querySelector(".mezo").offsetHeight; 
    let pieceHeight = 0.8*tileHeight; 
    pieces = document.querySelectorAll("i.fas");
    let length = pieces.length;
    for (let i = 0; i<length ; i++ ) {
        pieces[i].style.fontSize = `${pieceHeight}px`;
    }
}

const setLeftOffset = () => {
    let length = pieces.length;
    for (let i = 0; i<length; i++) {
        let pieceWidth = pieces[i].offsetWidth;
        let leftOffset = (tileHeight-pieceWidth)/2;
        pieces[i].style.left = `${leftOffset}px`;
    }
}

const setTopOffset = () => {
    let length = pieces.length;
    for (let i = 0; i<length; i++) {
        tileHeight = document.querySelector(".mezo").offsetHeight; 
        let pieceHeight = pieces[i].offsetHeight;
        let topOffset = (tileHeight-pieceHeight)/2;
        pieces[i].style.top = `${topOffset}px`;
    }
}

const positionPieces = () => {
    setPieceHeight();       
    setTopOffset();
    setLeftOffset(); 
}

let pieceIsSelected = false;
let selectedPiece = []; //selectedPiece format ["color", piecetype number , "placed tile id"] e.g. ["white", 0 , "e4"]

const pieceNameFinder = (theClass) => {
    let names = ["pawn","rook","knight","bishop","queen","king"];
    let i;
    for (i in names) {
        if (theClass.search(names[i]) != -1 ) {
            selectedPiece[1] = parseInt(i);
            return;
        }
    }
}

let thePiece; //store the selected piece for later use in moving it

let nextToMove = "white";
const toggleNext = () => {
    nextToMove == "white" ? nextToMove = "black" : nextToMove = "white";
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

const fileTable = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8
}

const idToNumber = (id) => {
    return (parseInt(fileTable[id[0]] + id[1]));
}

const numberToId = (numId) => {
    numId = numId.toString();
    if (parseInt(numId[0]) > 8 || parseInt(numId[1]) > 8 || parseInt(numId[0]) < 1 || parseInt(numId[1]) < 1 || numId[1] == undefined) {
        return null;
    } 
    return Object.keys(fileTable)[numId[0] - 1] + numId[1];     
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

const pawnCaptures = (selected , inputs ) => {
    let captureNums = [ inputs[4] , inputs[5] ];
    for (let i = 0 ; i < captureNums.length ; i++ ) {
        if (checkIfOccupied(numberToId((idToNumber(selected[2]) + captureNums[i]))) == inputs[1]) {
            legals.push(numberToId((idToNumber(selected[2]) + captureNums[i])));
        }
    }
}

const pawnAdvanceOne = (selected , inputs) => {
    if (checkIfOccupied(numberToId((idToNumber(selected[2]) + inputs[2] ))) == "not occupied") {
        legals.push(numberToId((idToNumber(selected[2]) + inputs[2] )));
        return true;
    }
}

const pawnAdvanceTwo = (selected , inputs) => {
    if (checkIfOccupied(numberToId((idToNumber(selected[2]) + 2 * inputs[2] ))) == "not occupied") { 
        legals.push(numberToId((idToNumber(selected[2]) + 2 * inputs[2] )));
    }
}

const calcLegalsPawns = (selected) => {
    let pawnInputs = []; // values: ["own color" , "opposing" , "movement direction", "starting row" , "capture right", "capture left"] first is same color as the selected piece
    if (selected[0] == "white") {
        pawnInputs = ["white" , "black" , 1 , 2 , 11 , -9 ];
    } else if (selected[0] == "black") {
        pawnInputs = ["black" , "white", -1 , 7 , 9 , -11 ];
    }
    if (selected[2][1] == pawnInputs[3] ) {
        if (pawnAdvanceOne(selected, pawnInputs)) {
            pawnAdvanceTwo(selected, pawnInputs);
        }
    } else {
        pawnAdvanceOne(selected, pawnInputs);        
    }
    pawnCaptures(selected , pawnInputs); 
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


const calcCastling = (selected) => {
    if (selected[0] == "white" && selected[1] == 5) {
     //placeholder   
    }
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

/*let btn = document.querySelector("#btn-div");
btn.addEventListener("click", setThePieces);*/

window.addEventListener("click", e => {
    pieceIsSelected ? movePiece(e) : pieceSelector(e);
});

window.addEventListener("touchstart", e => {
    pieceIsSelected ? movePiece(e) : pieceSelector(e);    
});

window.addEventListener('resize', () => {
    let newHeight = document.querySelector(".mezo").offsetHeight;
    if (piecesAreSet && newHeight != tileHeight) {
        positionPieces();
        newHeight = tileHeight;
    }
});