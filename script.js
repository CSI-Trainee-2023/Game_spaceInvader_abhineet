let blockSize=5;
let rows= 150;
let columns = 180;
let context;
const bg= new Image();
bg.src="assets/space.png"; 
let shipImg;
let velocityx= blockSize;
let velocityy= blockSize;
const a1 = document.getElementById("blastAudio");
const a2 = document.getElementById("gameoverAudio");

//monster
let array=[]
let monsterWidth=11*blockSize;
let monsterHeight=10*blockSize;
let monsterx= 5*blockSize;
let monstery=blockSize;
let monsterImg;
let monsterRows=2;
let monsterColoumn=2;
let monsterCount=0;
let monsterVelocityx=2;

//bullet
let bulletArray=[];
let bulletVelocity=-10;
let score=0;
let gameover=false;

let gameovertext="Game Over";

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
    shipImg=new Image();
    shipImg.src="assets/main (2).png";
    shipImg.onload=function(){
        context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height)
    }
    monsterImg=new Image();
    monsterImg.src="assets/monster2.png";
    // monsterImg.onload=function(){
    //     context.drawImage(monsterImg,monster.x,monster.y,monster.width,monster.height)
    // }
    createMonster();
    requestAnimationFrame(update);
    document.addEventListener("keydown",movement);
    document.addEventListener("keyup",fire);
}

//movement of ship

function update(){
    requestAnimationFrame(update);
    if(gameover){
        return;
    }
    context.clearRect(0,0,board.width,board.height);
    context.drawImage(bg, 0, 0, board.width, board.height);


    context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height);
    for(let i=0;i<array.length;i++){
        let monster=array[i];
        if(monster.alive){
            monster.x+= monsterVelocityx;
            if(monster.x+ monsterWidth>=board.width-5*blockSize || monster.x<=5*blockSize){
                monsterVelocityx*= -1;
                monster.x+=monsterVelocityx*2;
                
                for(let j=0;j<array.length;j++){
                    array[j].y +=monsterHeight;
                }
            }

            context.drawImage(monsterImg,monster.x,monster.y,monster.width,monster.height)
            if(monster.y>=ship.y){
                gameover=true;
                audio2();
                context.fillStyle="white";
                context.font="60px courier";
                context.fillText(gameovertext,270,350)
            }
        }

    }
    for(let i=0;i< bulletArray.length;i++){
        let  bullet= bulletArray[i];
        bullet.y+=bulletVelocity;
        context.fillStyle="orange";
        context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
        

        for(let j=0;j<array.length;j++){
            let monster=array[j];
            if(!bullet.used && monster.alive && collision(bullet,monster)){
                bullet.used= true;
                monster.alive=false;
                monsterCount--;
                score++;
                audio1();
            }
        }
    }

    while(bulletArray.length>0 && (bulletArray[0].used || bulletArray[0].y<0)){
        bulletArray.shift();
    }

    if(monsterCount==0){
        monsterColoumn = Math.min(monsterColoumn+1, columns/2);
        monsterRows=Math.min(monsterRows+1, rows+44);
        monsterVelocityx+=.5;
        array=[];
        bulletArray=[];
        createMonster();

    }
    context.fillStyle="white";
    context.font="20px courier";
    context.fillText(score,5,20)

}
function movement(event){
    if(gameover){
        return;
    }
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
 function createMonster(){
    for(let i=0;i<monsterColoumn;i++){
        for(let j=0;j<monsterRows;j++){
            let monster={
                img: monsterImg,
                x: monsterx+i*monsterWidth,
                y: monstery+j*monsterHeight,
                width : monsterWidth,
                height : monsterHeight,
                alive : true
            }
            array.push(monster);
        }
    }
    monsterCount=array.length;
 }
function fire(event){
    if(gameover){
        return;
    }

    if(event.code=="Space"){
        let bullet={
            x: ship.x+shipWidth/2,
            y: ship.y,
            width: blockSize,
            height: blockSize,
            used:false
        }
        bulletArray.push(bullet);
        
    }
}

function collision(a,b){
    return a.x< b.x+b.width && a.x+a.width>b.x && a.y<b.y+b.height && a.y+a.height>b.y;
}
function audio1(){
    a1.currentTime=0;


    a1.play();
}
function audio2(){
    a2.currentTime=0;


    a2.play();
}