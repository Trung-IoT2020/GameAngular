export class Bubbles {
  x!: any;
  y!: any;
  radius!: any;
  speed!: any;
  distance!: any;
  counted!: any;
  sound!: any;
  bubbleImage!: any;
  playerX!: any;
  playerY!: any;
  ctx!: any;

  constructor(
    x: any,
    y: any,
    radius: any,
    speed: any,
    counted: any,
    sound: any,
    bubbleImage: any,
    playerX: any,
    playerY: any,
    ctx: any,
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.counted = counted;
    this.sound = sound;
    this.bubbleImage = bubbleImage;
    this.playerX = playerX;
    this.playerY = playerY;
    this.ctx = ctx;

  }

  update(): any {
    this.y -= this.speed;
    const dx = this.x - this.playerX;
    const dy = this.y - this.playerY;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }

  draw(): any {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.drawImage(this.bubbleImage, this.x - 55, this.y - 55, this.radius * 2.2, this.radius * 2.2);
  }
}
