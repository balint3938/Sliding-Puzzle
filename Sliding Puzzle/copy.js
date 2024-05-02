let mainBox=document.querySelector(".mainBox");
let tiles=document.querySelectorAll(".tile");
let tileOrder=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const dir=[[-1,0],[0,1],[1,0],[0,-1]];
let tileMatr=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
let winComb=[[0,0,0,0,0,0],[0,1,2,3,4,0],[0,5,6,7,8,0],[0,9,10,11,12,0],[0,13,14,15,16,0],[0,0,0,0,0,0]];
let activeTiles=[];
let activeTilesNr=[];
let vacantTile={vacantId: document.querySelector("#t16"),x:-1 ,y:-1};
let removeFunc=[];
let congrBox=document.createElement("div");
let resetButton=document.createElement("button");

startGame();

function startGame(){  
    do{
       durstenfeldShuffle(tileOrder);
    }while(countPolarity(tileOrder));
    for (let i=0;i<16;i++){
        tiles[i].id="t"+tileOrder[i];
        if (tileOrder[i]===16){
            tiles[i].textContent='';
        }
        else tiles[i].textContent=tileOrder[i];
    }

    vacantTile={vacantId: document.querySelector("#t16"),x:-1 ,y:-1};
    
    for (let i=1;i<=4;i++){
        for (let j=1;j<=4;j++){
            tileMatr[i][j]=tileOrder[4*(i-1)+j-1];
            if (tileMatr[i][j]===16){
                vacantTile.x=i;
                vacantTile.y=j;
            }
        }
    }
    setMovableTiles();
}

function countPolarity(arrayTemp){
    let inv=0;
    for (let i=0;i<16;i++){
        if (arrayTemp[i]!==16){
            for (let j=i+1;j<16;j++){
                if (arrayTemp[i]>arrayTemp[j] && arrayTemp[j]!==16){
                    inv++;
                }
            }
        }
    }
    if (inv%2===1){
        return true;
    }
    return false;
}

function durstenfeldShuffle(array) {
    for (let i=array.length-1;i>0;i--) {
        let j=Math.floor(Math.random()*(i+1));
        let temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
}

function setMovableTiles(){
    let rowInd=vacantTile.x;
    let colInd=vacantTile.y;
    let activeId;
    let activeTile;
    if (tileMatr[rowInd-1][colInd]!==0){
        activeId="#t"+tileMatr[rowInd-1][colInd];
        activeTile=document.querySelector(activeId);
        activeTiles.push(activeTile);
        activeTilesNr.push(0);
    }   
    if (tileMatr[rowInd][colInd+1]!==0){
        activeId="#t"+tileMatr[rowInd][colInd+1];
        activeTile=document.querySelector(activeId);
        activeTiles.push(activeTile);
        activeTilesNr.push(1);
    }
    if (tileMatr[rowInd+1][colInd]!==0){
        activeId="#t"+tileMatr[rowInd+1][colInd];
        activeTile=document.querySelector(activeId);
        activeTiles.push(activeTile);
        activeTilesNr.push(2);
    }
    if (tileMatr[rowInd][colInd-1]!==0){
        activeId="#t"+tileMatr[rowInd][colInd-1];
        activeTile=document.querySelector(activeId);
        activeTiles.push(activeTile);
        activeTilesNr.push(3);
    }
    for (let i=0;i<activeTiles.length;i++){
        activeTiles[i].addEventListener('click',removeFunc[i]=function dummy(){
            tileSlide(activeTilesNr[i],activeTiles[i]);
        });
    }
}

function tileSlide(activeTilesNr,swappedTile){
    let temp1;
    let temp2;
    let xOffset=dir[activeTilesNr][0];
    let yOffset=dir[activeTilesNr][1];
    temp2=tileMatr[vacantTile.x][vacantTile.y];
    tileMatr[vacantTile.x][vacantTile.y]=tileMatr[vacantTile.x+xOffset][vacantTile.y+yOffset];
    tileMatr[vacantTile.x+xOffset][vacantTile.y+yOffset]=temp2;
    vacantTile.x=vacantTile.x+xOffset;
    vacantTile.y=vacantTile.y+yOffset;
    temp1=vacantTile.vacantId;
    vacantTile.vacantId=swappedTile;
    swappedTile=temp1;
    swappedTile.id=vacantTile.vacantId.id;
    swappedTile.textContent=vacantTile.vacantId.textContent;
    vacantTile.vacantId.id="t16";
    vacantTile.vacantId.textContent="";
    tileReset();
}

function tileReset(){
    for (let i=0;i<activeTiles.length;i++){
        activeTiles[i].removeEventListener('click', removeFunc[i]);
    }
    while (activeTiles.length!==0){
        activeTiles.pop();
        activeTilesNr.pop();
    }
    if (matricesAreEqual(winComb,tileMatr)){
        setMovableTiles();
        gameWin();
    }
    else{
        setMovableTiles();
    }
}

function gameWin(){
    congrBox.textContent="You win!";
    congrBox.style.background='green';
    resetButton.textContent="Reset";
    resetButton.addEventListener('click',resetGame);
    document.body.appendChild(congrBox);
    document.body.appendChild(resetButton);
}

function resetGame(){
    document.body.removeChild(congrBox);
    document.body.removeChild(resetButton);
    startGame();
}

function matricesAreEqual(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        return false;
    }

    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1[0].length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) {
                return false;
            }
        }
    }
    return true;
}