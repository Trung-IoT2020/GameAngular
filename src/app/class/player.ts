export class Player {
  x!: number;
  y!: number;
  radius!: number;
  angle!: number;
  frameX!: number;
  frameY!: number;
  frame!: number;
  spriteW!: number;
  spriteH!: number;
  mouseX!: number;
  mouseY!: number;
  ctx!: any;
  MouseClick!: any;
  playerLeft!: any;
  playerRight!: any;
  gameFrame!: any;


  constructor(
    x: number,
    y: number,
    radius: number,
    angle: number,
    frameX: number,
    frameY: number,
    frame: number,
    spriteW: number,
    spriteH: number,
    mouseX: number,
    mouseY: number,
    gameFrame: any,
    MouseClick: any,
    playerLeft: any,
    playerRight: any,
    ctx: any
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.frameX = frameX;
    this.frameY = frameY;
    this.frame = frame;
    this.spriteW = spriteW;
    this.spriteH = spriteH;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.gameFrame = gameFrame;
    this.MouseClick = MouseClick;
    this.ctx = ctx;
    this.playerLeft = playerLeft;
    this.playerRight = playerRight;


  }

  updatePlayer(): any {
    const dx = this.x - this.mouseX;
    const dy = this.y - this.mouseY;

    const theta = Math.atan2(dy, dx);
    console.log(theta);
    this.angle = theta;
    if (this.mouseX !== this.x) {
      this.x -= dx / 50;
    }
    if (this.mouseY !== this.y) {
      this.y -= dy / 50;
    }
    // if (this.gameFrame % 5 === 0) {
    //   this.frame++;
    //   if (this.frame >= 12) {
    //     this.frame = 0;
    //   }
    //   if (this.frame === 3 || this.frame === 7 || this.frame === 0 || this.frame === 11) {
    //     this.frameX = 0;
    //   } else {
    //     this.frameX++;
    //   }
    //   if (this.frame < 3) {
    //     this.frameY = 0;
    //   } else if (this.frame < 7) {
    //     this.frameY = 1;
    //   } else if (this.frame < 11) {
    //     this.frameY = 2;
    //   } else {
    //     this.frameY = 0;
    //   }
    // }
  }

  drawPlayer(): any {
    if (this.MouseClick) {
      this.ctx.lineWidth = 0.2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();
    }
    // this.ctx.fillStyle = 'red';
    // this.ctx.beginPath();
    // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // this.ctx.fill();
    // this.ctx.closePath();
    // this.ctx.fillRect(this.x, this.y, this.radius, 10);
    // if (this.x >= this.mouseX) {
    //   this.x =this.mouseX;
    //   this.y =this.mouseY;
    // }else{
    //   this.x =this.mouseX;
    //   this.y =this.mouseY;
    // }
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);
    if (this.x >= this.mouseX) {

      this.ctx.drawImage(this.playerLeft, this.frameX * this.spriteW, this.frameY * this.spriteH,
        this.spriteW, this.spriteH, 0 - 60, 0 - 45, this.spriteW / 4, this.spriteH / 4);
    } else {
      this.ctx.drawImage(this.playerRight, this.frameX * this.spriteW, this.frameY * this.spriteH,
        this.spriteW, this.spriteH, 0 - 60, 0 - 45, this.spriteW / 4, this.spriteH / 4);
    }
    this.ctx.restore();
  }

}

