var canvas= document.querySelector('canvas');
const context=canvas.getContext("2d")
class ship{
    constructor(){
        this.position={
            x: 200,
            y: 200

        }
        this.velocity={
            x: 0,
            y: 0
        }
        const img=new Image()
        img.src="/Game_spaceInvader_abhineet/assets/download-removebg-preview.png"
        
        img.onload=()=>{
            const scale=0.25
            this.img=img
            this.width=img.width*scale
            this.height=img.height*scale
        
        }
        
    }
    draw(){
        if(this.draw){
            c.draw (
                this.img, 
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
            
                   
        }
    }

}

