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
let whiteQueen = '<i class="piece whitepiece fas fa-chess-queen"></i>';
let whiteBishop = '<i class="piece whitepiece fas fa-chess-bishop"></i>';
let whiteKnight = '<i class="piece whitepiece fas fa-chess-knight"></i>';
let whiteRook = '<i class="piece whitepiece fas fa-chess-rook"></i>';
let whitePawn = '<i class="piece whitepiece fas fa-chess-pawn"></i>';

let blackKing = '<i id="blackking" class="piece blackpiece fas fa-chess-king"></i>';
let blackQueen = '<i class="piece blackpiece fas fa-chess-queen"></i>';
let blackBishop = '<i class="piece blackpiece fas fa-chess-bishop"></i>';
let blackKnight = '<i class="piece blackpiece fas fa-chess-knight"></i>';
let blackRook = '<i class="piece blackpiece fas fa-chess-rook"></i>';
let blackPawn = '<i class="piece blackpiece fas fa-chess-pawn"></i>';

//let highLightDiv = '<div id=highlight></div>';
let highLightDiv = document.createElement("div");
highLightDiv.className = "highlight";

let piecesAreSet = false;

function setThePieces() {
    if (!piecesAreSet) {
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

function restart() {
    if (piecesAreSet)
    alert("restart function placeholder");
}

function testpiece() {
    document.getElementById("e4").innerHTML = whiteKnight;
}

let selectedPiece;
let stepArray = [];
let isItTile = false;
let isItPiece = false;
let pieceIsSelected = false;
let targetIsSelected = false;
let selectedPieceColorVal = "white";
let targetedPieceColorVal = "black";
let tileIsOccupied;
let firstSelect;
let otherSelect;

function tileOrPiece(myParam) {
    if (mezok.includes(myParam.target.id)) {
        isItTile = true;
        isItPiece = false;
    } else if (myParam.target.className.search("piece") != -1) {
        isItTile = false;
        isItPiece = true;
    }
}

function selectedPieceColor(myParam5) {
    if (myParam5.target.className.search("whitepiece") != -1) {
        selectedPieceColorVal = "white";
    } else if (myParam5.target.className.search("blackpiece") != -1) {
        selectedPieceColorVal = "black";
    }
}

function targetedPieceColor(myParam7) {
    if (myParam7.target.className.search("whitepiece") != -1) {
        targetedPieceColorVal = "white";
    } else if (myParam7.target.className.search("blackpiece") != -1) {
        targetedPieceColorVal = "black";
    }
}

function selectPiece(myParam2) {
    /* selecting a piece*/
    if (pieceIsSelected == false && isItPiece) {
        selectedPiece = myParam2.target;
        let from = myParam2.target.parentNode.id;
        stepArray[0] = from;
        pieceIsSelected = true;
        selectedPieceColor(myParam2);
        firstSelect = true;
        highLighter(myParam2);

    /*selecting other piece instead of the selected*/
    } else if (pieceIsSelected == true && myParam2.target.parentNode.id != "highlight" && myParam2.target.className.search("piece") != -1) {
        let from2 = myParam2.target.parentNode.id;
        selectedPiece = myParam2.target;
        stepArray[0] = from2;
        pieceIsSelected = true;
        selectedPieceColor(myParam2);
        firstSelect = false;
        otherSelect = true;
        highLighter(myParam2);
    }
}

function selectTargetTile(myParam3) {
    if (mezok.includes(myParam3.target.id)) {
        tileIsOccupied = document.getElementById(myParam3.target.id).hasChildNodes();
        if (!tileIsOccupied) {
            let stepTarget = myParam3.target.id;
            stepArray[1] = stepTarget;
            targetIsSelected = true;
        }
    } else if ((myParam3.srcElement.className.search("piece") != -1) && (myParam3.target.parentNode.id != stepArray[0])) {
        targetedPieceColor(myParam3);
        if (selectedPieceColorVal != targetedPieceColorVal) {
            stepTarget = myParam3.target.parentNode.id;
            stepArray[1] = stepTarget;
            targetIsSelected = true;
        } else {
            selectPiece(myParam3);
        }
    }
}

function movePiece(myParam4) {
    if (stepArray.length == 2) {
        let fromTile = document.getElementById(stepArray[0]);
        let toTile = document.getElementById(stepArray[1]);
        //toTile.innerHTML = selectedPiece.outerHTML;
        if (toTile.firstElementChild) {
            toTile.removeChild(toTile.firstChild);
        }
        toTile.appendChild(selectedPiece);
        //fromTile.innerHTML = "";
        fromTile.removeChild(fromTile.firstChild);
        stepArray.length = 0;
        pieceIsSelected = false;
        isItTile = false;
        isItPiece = false;
    }
}

let choosenPiece;
let firstChoosenPiece;
let tileOfChoosen;
let tileOfFirstChoosen;

let legalsKnight = ["21", "12", "19", "8", "-3", "-12", "-21", "-19", "-8"];

function highLighter(myParam8) {
    if (stepArray.length == 1 && (myParam8.target.className.search("piece") != -1)) {
        if (firstSelect) {
            choosenPiece = myParam8.target;
            firstChoosenPiece = myParam8.target;

            tileOfChoosen = document.getElementById(myParam8.target.parentNode.id);
            tileOfFirstChoosen = document.getElementById(myParam8.target.parentNode.id);

            //tileOfChoosen.innerHTML = highLightDiv;
            tileOfChoosen.appendChild(highLightDiv);
            //document.getElementById("highlight").innerHTML = choosenPiece.outerHTML;
            highLightDiv.appendChild(choosenPiece);
            //highlightLegal();
            
            
        } else if (otherSelect) {
            //tileOfFirstChoosen.innerHTML = firstChoosenPiece.outerHTML;

            tileOfFirstChoosen.removeChild(tileOfFirstChoosen.firstChild);
            tileOfFirstChoosen.appendChild(firstChoosenPiece);

            choosenPiece = myParam8.target;            
            firstChoosenPiece = myParam8.target;

            tileOfChoosen = document.getElementById(myParam8.target.parentNode.id);
            tileOfFirstChoosen = document.getElementById(myParam8.target.parentNode.id);

            //tileOfChoosen.innerHTML = highLightDiv;
            tileOfChoosen.removeChild(tileOfChoosen.firstChild);
            tileOfChoosen.appendChild(highLightDiv);

            //document.getElementById("highlight").innerHTML = choosenPiece.outerHTML;
            highLightDiv.appendChild(choosenPiece);


        }
    }
}


function highlightLegal() {
    if (selectedPiece) {
        let legal = legalMoves(pieceIdentifier(selectedPiece),pieceIdConverter(selectedPiece.parentNode.parentNode.id));
        document.getElementById(legal).appendChild(highLightDiv);
    }
}

//selectedPiece.className

function pieceIdentifier(piece) {
    if (piece.className.search("pawn") != -1) {
        return 0;
    }
    if (piece.className.search("rook") != -1) {
        return 1;
    }
    if (piece.className.search("knight") != -1) {
        return 2;
    }
    if (piece.className.search("bishop") != -1) {
        return 3;
    }
    if (piece.className.search("queen") != -1) {
        return 4;
    }
    if (piece.className.search("king") != -1) {
        return 5;
    }
    
}

function pieceIdConverter(id) {
    if (id[0] == "a") {
        return "1"+id[1];
    }
    if (id[0] == "b") {
        return "2"+id[1];
    }
    if (id[0] == "c") {
        return "3"+id[1];
    }
    if (id[0] == "d") {
        return "4"+id[1];
    }
    if (id[0] == "e") {
        return "5"+id[1];
    }
    if (id[0] == "f") {
        return "6"+id[1];
    }
    if (id[0] == "g") {
        return "7"+id[1];
    }
    if (id[0] == "h") {
        return "8"+id[1];
    }
}

function numIdConverter(id) {
    if (id[0] == "1") {
        return "a"+id[1];
    }
    if (id[0] == "2") {
        return "b"+id[1];
    }
    if (id[0] == "3") {
        return "c"+id[1];
    }
    if (id[0] == "4") {
        return "d"+id[1];
    }
    if (id[0] == "5") {
        return "e"+id[1];
    }
    if (id[0] == "6") {
        return "f"+id[1];
    }
    if (id[0] == "7") {
        return "g"+id[1];
    }
    if (id[0] == "8") {
        return "h"+id[1];
    }
}


//returns the id of legal tiles in a string like "e5"
function legalMoves(pieceTypeNumber, numId) {
    //legal moves for pawns
    if (pieceTypeNumber == 0) {
        if (parseInt(numId[1])+1 <= 8) {
            return numIdConverter(numId[0]+String(parseInt(numId[1])+1));          
        }
    }
}



window.addEventListener("click", function(e) {
    if (pieceIsSelected) {
        selectTargetTile(e);
        movePiece(e);
    }
    else if (!pieceIsSelected) {
        tileOrPiece(e);
        selectPiece(e);
    }
});

window.addEventListener("touchstart", function(e) {
    if (pieceIsSelected) {
        selectTargetTile(e);
        movePiece(e);
    }
    else if (!pieceIsSelected) {
        tileOrPiece(e);
        selectPiece(e);
    }
});