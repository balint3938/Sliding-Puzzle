let mainBox=document.querySelector(".mainBox");
let tiles=document.querySelectorAll(".tile");
let tileOrder=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const dir=[[-1,0],[0,1],[1,0],[0,-1]];
let tileMatr=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
let activeTiles=[];
let activeTilesNr=[];
let vacantTile={vacantId: document.querySelector("#t16"),x:-1 ,y:-1};
let removeFunc=[];

startGame();

function startGame(){  
    durstenfeldShuffle(tileOrder);
    for (let i=0;i<16;i++){
        //tiles[i].addEventListener('click',slideTile);
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
        activeTiles[i].style.background="red";
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
        console.log(activeTiles[i]);
        activeTiles[i].style.background="transparent";
    }
    while (activeTiles.length!==0){
        activeTiles.pop();
        activeTilesNr.pop();
    }
    setMovableTiles();
}