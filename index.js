const canvas=document.getElementById("space_invader");
const ctx=canvas.getContext("2d");


// monster control

class MonsterControl{
    monstermap=[
        [0,0,0,1,1,0,0,0],
        [1,1,1,1,1,1,1,1],
        [1,1,2,2,2,2,1,1],
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
    ];
    monsterRows=[];
    constructor(canvas){
        this.canvas=canvas;
        this.createmonster();
    }
    draw(ctx){
       
    }
    createmonster(){
        this.monstermap.forEach((row,rowIndex)=>{
            this.monsterRows[rowIndex]=[];
            row.forEach((monsterNumber,monsterIndex)=>{
                if(monsterNumber>0){
                    this.enemyRows[rowIndex].push(new monster(monsterIndex*50, rowIndex*35,monsterNumber))
                }
            })


        })

    }
}
class monster{
    constructor(x,y,imageNumber){
        
    }

}
// const monsterControl= new MonsterControl(canvas);


// main function call for the game
const bg= new Image();
bg.src="assets/space.png"; 
alert("fuck u")
function game(){
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    monsterControl.draw(ctx);
}
setInterval(game,1000/60);
