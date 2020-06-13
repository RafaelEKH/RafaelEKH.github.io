let mezok = [
    "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8",
    "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8",
    "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",
    "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8",
    "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8",
    "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8",
    "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8",
    "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"
];

let whiteKing = '<i id="whiteking" class="piece whitepiece fas fa-chess-king"></i>';
let whiteQueen = '<i id="whitequeen" class="piece whitepiece fas fa-chess-queen"></i>';
let whiteBishop = '<i id="whitebishop" class="piece whitepiece fas fa-chess-bishop"></i>';
let whiteKnight = '<i id="whiteknight" class="piece whitepiece fas fa-chess-knight"></i>';
let whiteRook = '<i id="whiterook" class="piece whitepiece fas fa-chess-rook"></i>';
let whitePawn = '<i id="whitepawn" class="piece whitepiece fas fa-chess-pawn"></i>';

let blackKing = '<i id="blackking" class="piece blackpiece fas fa-chess-king"></i>';
let blackQueen = '<i id="blackqueen" class="piece blackpiece fas fa-chess-queen"></i>';
let blackBishop = '<i id="blackbishop" class="piece blackpiece fas fa-chess-bishop"></i>';
let blackKnight = '<i id="blackknight" class="piece blackpiece fas fa-chess-knight"></i>';
let blackRook = '<i id="blackrook" class="piece blackpiece fas fa-chess-rook"></i>';
let blackPawn = '<i id="blackpawn" class="piece blackpiece fas fa-chess-pawn"></i>';

let piecesAreSet = false;

function setThePieces() {
    if (piecesAreSet == false) {
        document.getElementById("a1").innerHTML = whiteRook;
        document.getElementById("b1").innerHTML = whiteKnight;
        document.getElementById("c1").innerHTML = whiteBishop;
        document.getElementById("d1").innerHTML = whiteQueen;
        document.getElementById("e1").innerHTML = whiteKing;
        document.getElementById("f1").innerHTML = whiteBishop;
        document.getElementById("g1").innerHTML = whiteKnight;
        document.getElementById("h1").innerHTML = whiteRook;
        document.getElementById("a2").innerHTML = whitePawn;
        document.getElementById("b2").innerHTML = whitePawn;
        document.getElementById("c2").innerHTML = whitePawn;
        document.getElementById("d2").innerHTML = whitePawn;
        document.getElementById("e2").innerHTML = whitePawn;
        document.getElementById("f2").innerHTML = whitePawn;
        document.getElementById("g2").innerHTML = whitePawn;
        document.getElementById("h2").innerHTML = whitePawn;
        document.getElementById("a8").innerHTML = blackRook;
        document.getElementById("b8").innerHTML = blackKnight;
        document.getElementById("c8").innerHTML = blackBishop;
        document.getElementById("d8").innerHTML = blackQueen;
        document.getElementById("e8").innerHTML = blackKing;
        document.getElementById("f8").innerHTML = blackBishop;
        document.getElementById("g8").innerHTML = blackKnight;
        document.getElementById("h8").innerHTML = blackRook;
        document.getElementById("a7").innerHTML = blackPawn;
        document.getElementById("b7").innerHTML = blackPawn;
        document.getElementById("c7").innerHTML = blackPawn;
        document.getElementById("d7").innerHTML = blackPawn;
        document.getElementById("e7").innerHTML = blackPawn;
        document.getElementById("f7").innerHTML = blackPawn;
        document.getElementById("g7").innerHTML = blackPawn;
        document.getElementById("h7").innerHTML = blackPawn;
        piecesAreSet = true;
        document.getElementById("piecesetter").innerHTML = "The pieces are set!";
    }

}

function doNothing() {
    console.log("kattints máshova fam");
}

let selectedPiece;
let stepArray = [];
let isItTile = false;
let isItPiece = false;
let pieceIsSelected = false;

function tileOrPiece(myParam) {
    if (mezok.includes(myParam.target.id)) {
        isItTile = true;
        isItPiece = false;
        console.log("you clicked on a tile");
    } else if (myParam.srcElement.className.search("piece") != -1) {
        isItTile = false;
        isItPiece = true;
        console.log("You clicked on a piece");
    } else {
        doNothing();
    }
}

let isHighlighted = false;


function highlightSelectedTile() {
   
}

function selectPiece(myParam2) {
    if (pieceIsSelected == false && isItPiece) {
        let from = myParam2.target.parentNode.id;
        stepArray[0] = from;
        console.log(stepArray);
        pieceIsSelected = true;
        selectedPiece = myParam2.target;
        
    } else if (pieceIsSelected == true && myParam2.target.parentNode.id != stepArray[0] && myParam2.srcElement.className.search("piece") != -1) {
        let from = myParam2.target.parentNode.id;
        stepArray[0] = from;
        console.log(stepArray);
        pieceIsSelected = true;
        selectedPiece = myParam2.target;
        
    }

}

function selectTargetTile(myParam3) {
    if (isItTile == true && pieceIsSelected == true) {
        let stepTarget = myParam3.target.id;
        console.log(stepTarget);
        stepArray[1] = stepTarget;
        console.log(stepArray);
    }
}

function movePiece(myParam4) {
    if (stepArray.length == 2) {
        let fromTile = document.getElementById(stepArray[0]);
        let toTile = document.getElementById(stepArray[1]);
        toTile.innerHTML = selectedPiece.outerHTML;
        fromTile.innerHTML = "";
        stepArray.length = 0;
        pieceIsSelected = false;
    }
}

window.onclick = e => {
    tileOrPiece(e);
    selectPiece(e);
    selectTargetTile(e);
    movePiece(e);
}
