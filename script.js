let blockSize=5;
let rows= 150;
let columns = 180;
let context;
const bg= new Image();
bg.src="assets/space.png"; 
let shipImg;
let velocityx= blockSize;
let velocityy= blockSize;


//ship

let shipWidth= 20*blockSize;
let shipHeight=20*blockSize;

let shipx= blockSize* columns/2 -20*blockSize;
let shipy= blockSize* rows -blockSize*20;

let ship= {
    x:shipx,
    y: shipy,
    width: shipWidth,
    height: shipHeight


} 



window.onload=function(){
    board=document.getElementById("space_invader");
    context=board.getContext("2d");
    context.drawImage(bg, 0, 0, board.width, board.height);
    // context.fillStyle="green";
    // context.fillRect(ship.x,ship.y,ship.width,ship.height);
    shipImg=new Image();
    shipImg.src="assets/main_char.png";
    shipImg.onload=function(){
        context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height)
    }
    requestAnimationFrame(update);
    document.addEventListener("keydown",movement)
}

//movement of ship

function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width,board.height);
    context.drawImage(bg, 0, 0, board.width, board.height);


    context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height);


}
function movement(event){
    if(event.code=="ArrowLeft" && ship.x-velocityx>=0){
        ship.x-=2*velocityx;

    }
    else if(event.code=="ArrowRight" && ship.x+velocityx+ship.width<= board.width){
        ship.x+=2*velocityx;
    }
    
    else if(event.code=="ArrowDown" && ship.y+velocityy+ship.height <=board.height){
        ship.y+=2*velocityy;
    }else if(event.code=="ArrowUp" && ship.y-velocityy>=0){
        ship.y-=2*velocityy;
    }
 }