 const board = [
     [1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]
 ];
 const boardElementClass = [
    ["s1", "s2", "s3"],
    ["s4", "s5", "s6"],
    ["s7", "s8", "s9"]
 ]
function boardIndex(play){
    for (let i = 0; i < board.length; i++) {
        let index = board[i].indexOf(play);
        if (index > -1) {
            return [i,index];
        }
        
      }
}
let game=undefined;
let compMarker=undefined;
let userMarker=undefined;

let markerContainer=document.getElementsByClassName("markerContainer");
for(let i=0; i< markerContainer.length;i++){
     markerContainer[i].addEventListener('click', markerChoice);
}
//function that gets users marker choice
function markerChoice(){
 let choice=this.getAttribute("value");
 userMarker=String(choice);
 //gives compMarker the opposite marker
 if(userMarker=="X"){
     compMarker="O";
 }
 else{
     compMarker="X";
 }
 //comp always get middle space first
 board[1][1]=compMarker;
 let middle=document.getElementsByClassName("s5");
 let htmlElement=document.createElement("p");
 htmlElement.classList.add("spotMarker");
 htmlElement.innerHTML=compMarker;
 middle[0].appendChild(htmlElement);
 //removes the marker choices from DOM
 let markerChoice=document.getElementById("markerChoice");
 markerChoice.style.display="block";
 //removes marker options
 markerChoice.removeChild(markerContainer[1]);
 markerChoice.removeChild(markerContainer[0]);
 //creating element to tell user what marker they will be playing as
 let playingAs=document.createElement("p");
 playingAs.classList.add("playerMessage");
 playingAs.innerHTML="You are playing as "+ userMarker+ " Good Luck!";
 markerChoice.appendChild(playingAs);
 //create button to reset game
 let resetButton=document.createElement("button");
 //if button is clicked runs resetGame function
 resetButton.addEventListener('click', resetGame);
 resetButton.innerText="Reset Game!";
 resetButton.classList.add("resetButton");
 markerChoice.appendChild(resetButton);
 //removes message if is there
 let message=document.getElementById("message");
 message.innerText="";
}

//reset button clicked
function resetGame(){
    location.reload();
}


//array of all spots on board
let spot=document.getElementsByClassName("spot");
//loop to add event listener to spot
for(let i=0; i< spot.length;i++){
    spot[i].addEventListener('click', spotClicked);
}

function spotClicked(){
    //if marker was not chosen
    if(typeof userMarker == 'undefined'){
        let message=document.getElementById("message");
        message.innerText="Please Choose Your Marker!";
    }
    //marker was chosen
    else
    {   
        if(game==true){
            message.innerText="Sorry, game over!";
        }
        else{
        //checks to see if spot has marker already
        if(this.hasChildNodes()){
        message.innerText="That Spot Is Taken, Choose Another!";
        }
        //spot does not have a marker already
        else{
        //removes message if it is there
        message.innerText="";
        //creates spotMarker and inserts into the div
        let htmlElement=document.createElement("p");
        htmlElement.classList.add("spotMarker");
        htmlElement.innerHTML=userMarker;
        this.appendChild(htmlElement);
        //update board
        let play=this.getAttribute("value");
        let index=boardIndex(Number(play));
        board[index[0]][index[1]]=userMarker;
        computerTurn();
        }
    }
    }
    
}
//returns index of available spots
function availableSpots(){
    let availSpot=[];
    for(let i=0;i<board.length;i++){
        for(let k=0;k<board.length;k++){
            if(typeof(board[i][k])=="number"){
                availSpot.push([i,k]);
            }
        }
    }
    return availSpot;
}
//check horizontal and vertical risks
function riskCheck(){
    //THESE ARE VERTICAL RISKS
    //1 & 4
    if(board[0][0]==userMarker && board[1][0]==userMarker && board[2][0]!==compMarker){
        return [2,0];
    }
    //7 & 4
    else if(board[2][0]==userMarker && board[1][0]==userMarker && board[0][0]!==compMarker){
        return [0,0];
    }
    //3 & 6
    else if(board[0][2]==userMarker && board[1][2]==userMarker && board[2][2]!==compMarker){
        return [2,2];
    }
    //9 & 6
    else if(board[2][2]==userMarker && board[1][2]==userMarker && board[0][2]!==compMarker){
        return [0,2];
    }
    //1 & 7
    else if(board[0][0]==userMarker && board[2][0]==userMarker && board[1][0]!==compMarker){
        return [1,0];
    }
    //3 & 9
    else if(board[0][2]==userMarker && board[2][2]==userMarker && board[1][2]!==compMarker){
        return [1,2];
    }
    //THESE ARE HORIZONTAL RISKS
    //1 & 2
    else if(board[0][0]==userMarker && board[0][1]==userMarker && board[0][2]!==compMarker){
        return [0,2];
    }
    //2 & 3
    else if(board[0][1]==userMarker && board[0][2]==userMarker && board[0][0]!==compMarker){
        return [0,0];
    }
    //1 & 3
    else if(board[0][0]==userMarker && board[0][2]==userMarker && board[0][1]!==compMarker){
        return [0,1];
    }
    //7 & 8
    else if(board[2][0]==userMarker && board[2][1]==userMarker && board[2][2]!==compMarker){
        return [2,2];
    }
    //8 & 9
    else if(board[2][2]==userMarker && board[2][1]==userMarker && board[2][0]!==compMarker){
        return [2,0];
    }
    //7 & 9
    else if(board[2][0]==userMarker && board[2][2]==userMarker && board[2][1]!==compMarker){
        return [2,1];
    }
    else{
        return undefined;
    }

}
function ableToWin(){
    //checks horizontal
    for(let i=0;i<board.length;i++){
        let hCheck=0;
        let hIndex=undefined;
        for(let k=0;k<board.length;k++){
            if(board[i][k]==compMarker){
                hCheck++;
            }
            if(board[i][k]==userMarker){
                hCheck--;
            }
            if(board[i][k]!==userMarker && board[i][k]!==compMarker){
                hIndex=k;
            }
        }
        if(hCheck==2){
            return[i,hIndex];
        }
    }
    //check vertical win
    for(let i=0;i<board.length;i++){
        let vCheck=0;
        let vIndex=undefined;
        for(let k=0;k<board.length;k++){
            if(board[k][i]==compMarker){
                vCheck++;
            }
            if(board[k][i]==userMarker){
                vCheck--;
            }
            if(board[k][i]!==userMarker && board[k][i]!==compMarker){
                vIndex=k;
            }
        }
        if(vCheck==2){
            return[vIndex,i];
        }
    }
    //check diag win
    if(board[0][0]==compMarker && board[2][2]!==compMarker && board[2][2]!==userMarker)
    {
        return [2,2];
    }
    else if(board[0][2]==compMarker && board[2][0]!==compMarker && board[2][0]!==userMarker)
    {
        return [2,0];
    }
    else if(board[2][0]==compMarker && board[0][2]!==compMarker && board[0][2]!==userMarker)
    {
        return [0,2];
    }
    else if(board[2][2]==compMarker && board[0][0]!==compMarker && board[0][0]!==userMarker)
    {
        return [0,0];
    }

}
function computerTurn(){
   let htmlElement=document.createElement("p");
   htmlElement.classList.add("spotMarker");
   htmlElement.innerHTML=compMarker;
   let winChecker=undefined;
   //always checks if able to win first
   let win=ableToWin();
   let risk=riskCheck();
   if(win!==undefined){
    board[win[0]][win[1]]=compMarker;
    let winSpot=boardElementClass[win[0]][win[1]];
    winSpot=document.getElementsByClassName(winSpot);
    winSpot[0].appendChild(htmlElement);
    message.innerText="You Have Lost, Try Again";
    winChecker=true;
    game=true;
}
   //check if there is risk
   else if(risk!==undefined){
    board[risk[0]][risk[1]]=compMarker;
    let riskSpot=boardElementClass[risk[0]][risk[1]];
    riskSpot=document.getElementsByClassName(riskSpot);
    riskSpot[0].appendChild(htmlElement);
}
   //lastly checks available spots if not risk and not able to win
   else
   {
       let avail=availableSpots();
        avail=avail.pop();
        board[avail[0]][avail[1]]=compMarker;
       let spot=boardElementClass[avail[0]][avail[1]];
       spot=document.getElementsByClassName(spot);
       spot[0].appendChild(htmlElement);    
   }
   if(availableSpots().length==0 && winChecker!=true)
   {
    message.innerText="Its a Tie!";
    game=true;
   }
}
    
    

    