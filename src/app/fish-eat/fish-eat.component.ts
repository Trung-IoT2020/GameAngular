import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Player} from '../class/player';
import {Bubbles} from '../class/bubbles';

@Component({
  selector: 'app-fish-eat',
  templateUrl: './fish-eat.component.html',
  styleUrls: ['./fish-eat.component.scss']
})
export class FishEatComponent implements OnInit, AfterViewInit {
  @ViewChild('canvar1') canvasRef: ElementRef;
  private ctx: CanvasRenderingContext2D;
  score = 0;
  gameFrame = 0;
  player: any;
  mouse = {
    x: 0,
    y: 0,
    click: false
  };
  BG = {
    x: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    y: 0,
    width: 0,
    height: 0
  };

  // bubbles = {
  //   x: 0,
  //   y: 0,
  //   radius: 0,
  //   speed: 0,
  //   distance: 0,
  //   counted: false,
  //   sound: 'sound2'
  // };
  // @ts-ignore
  bubbles: any;

  gameSpeed = 1;
  bubblesPop1 = document.createElement('audio');
  bubblesPop2 = document.createElement('audio');
  playerLeft = new Image();
  playerRight = new Image();
  enemyLeft = new Image();
  enemyRight = new Image();
  background = new Image();
  bubbleImage = new Image();
  bubblesList = [];

  bubblesX: any;
  bubblesY: any;
  bubblesRadius: any;
  bubblesSpeed: any;
  bubblesDistance: any;
  bubblesCounted: any;
  bubblesSound: any;

  constructor() {

  }

  ngOnInit(): void {

  }

  contructData(): any {
    this.mouse = {
      x: this.canvasRef.nativeElement.width / 2,
      y: this.canvasRef.nativeElement.height / 2,
      click: false
    };
    this.player = {
      x: this.canvasRef.nativeElement.width,
      y: this.canvasRef.nativeElement.height / 2,
      radius: 50,
      angle: 0,
      frameX: 0,
      frameY: 0,
      frame: 0,
      spriteWidth: 498,
      spriteHeight: 327
    };
    this.bubbles = new Bubbles(
      Math.random() * this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height + Math.random() * this.canvasRef.nativeElement.height,
      50,
      Math.random() * 5 + 2,
      false,
      Math.random() <= 0.5 ? 'sound1' : 'sound2',
      this.bubbleImage,
      this.player.x,
      this.player.y,
      this.ctx
    );

    // this.bubbles= {
    //   x :Math.random() * this.canvasRef.nativeElement.width,
    //  y :this.canvasRef.nativeElement.height + Math.random() * this.canvasRef.nativeElement.height,
    //  radius: 50,
    //   speed: Math.random() * 5 + 1,
    //   distance: this.bubbles.distance,
    //  counted: false,
    //  sound :Math.random() <= 0.5 ? 'sound1' : 'sound2'
    // }

  }

  ngAfterViewInit(): void {
    const canvarPosition = this.canvasRef.nativeElement.getBoundingClientRect();
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.canvasRef.nativeElement.width = 1000;
    this.canvasRef.nativeElement.height = 500;
    this.imageGame();
    this.contructData();
    this.canvasRef.nativeElement.addEventListener('mousedown', (event: any) => {
      this.mouse.x = event.x - canvarPosition.left;
      this.mouse.y = event.y - canvarPosition.top;
      this.mouse.click = true;
    });
    this.canvasRef.nativeElement.addEventListener('mouseup', (event) => {
      this.mouse.click = false;
      this.player.MouseClick = false;
    });
    this.animate();


  }

  imageGame(): any {
    this.bubblesPop1.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo//image/Plop.ogg';
    this.bubblesPop2.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/image/soundBubble.mp4';
    this.playerLeft.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/image/fish-image-left.png';
    this.bubbleImage.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/image/bubble/bubble-64px.png';
    this.playerRight.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/image/fish-image-right.png';
    this.enemyLeft.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/image/spritesheets/fish-yellow-cartoon-left.png';
    this.enemyRight.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/image/spritesheets/fish-green-cartoon-right.png';
    this.background.src = 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/image/background1.png';
  }

  handleBubbles(): any {
    if (this.gameFrame % 50 === 0) {
      this.bubblesList.push(new Bubbles(
        Math.random() * this.canvasRef.nativeElement.width,
        this.canvasRef.nativeElement.height + Math.random() * this.canvasRef.nativeElement.height,
        50,
        Math.random() * 5 + 1,
        false,
        Math.random() <= 0.5 ? 'sound1' : 'sound2',
        this.bubbleImage,
        this.player.x,
        this.player.y,
        this.ctx
      ));
    }
    this.bubblesList.filter((i: any, index: any) => {
      i.update();
      i.draw();
    });
    this.bubblesList.filter((i: any, index: any) => {
      if (i.y < 0 - i.radius * 2) {
        this.bubblesList.splice(index, 1);
      }
      // console.log(i.distance, i.radius + this.player.radius);
      if (i.distance < i.radius + this.player.radius * 2) {
        // console.log("!@#%")
        if (!i.counted) {
          if (i.sound === 'sound1') {
            // @ts-ignore
            console.log('ABD');
          } else {
            // @ts-ignore
            console.log('ABD');
          }
          this.score++;
          console.log(this.score);
          i.counted = true;
          this.bubblesList.splice(index, 1);
          console.log(this.bubblesList);
        }
      }
    });

  }

  handleBackground(): any {
    this.BG.x1 -= this.gameSpeed;
    this.BG.x2 -= this.gameSpeed;
    if (this.BG.x1 < -this.BG.width) {
      this.BG.x1 = this.BG.width;
    }
    if (this.BG.x2 < -this.BG.width) {
      this.BG.x2 = this.BG.width;
    }
    this.ctx.drawImage(this.background, this.BG.x1, this.BG.y, this.BG.width, this.BG.height);
    // this.ctx.drawImage(this.background, this.BG.x1, this.BG.y, this.BG.width, this.BG.height);
  }

  updatePlayer(): any {
    const dx = this.player.x - this.mouse.x;
    const dy = this.player.y - this.mouse.y;

    const theta = Math.atan2(dy, dx);
    console.log(theta);
    this.player.angle = theta;
    if (this.mouse.x !== this.player.x) {
      this.player.x -= dx / 50;
    }
    if (this.mouse.y !== this.player.y) {
      this.player.y -= dy / 50;
    }
  }

  drawPlayer(): any {
    if (this.mouse.click) {
      this.ctx.lineWidth = 0.2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.player.x, this.player.y);
      this.ctx.lineTo(this.mouse.x, this.mouse.y);
      this.ctx.stroke();
    }
    // console.log(this.player.x, this.player.y, this.player.radius, 10);
    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    // this.ctx.fillRect(this.player.x, this.player.y, this.player.radius, 10);
    // this.ctx.save();
    // this.ctx.translate(this.player.x, this.player.y);
    // this.ctx.rotate(this.player.angle);
    // if (this.player.x >= this.mouse.x) {
    //   this.ctx.drawImage(this.playerLeft, this.player.frameX * this.player.spriteW, this.player.frameY * this.player.spriteH,
    //     this.player.spriteW, this.player.spriteH, 0 - 60, 0 - 45, this.player.spriteW / 4, this.player.spriteH / 4);
    // } else {
    //   this.ctx.drawImage(this.playerRight, this.player.frameX * this.player.spriteW, this.player.frameY * this.player.spriteH,
    //     this.player.spriteW, this.player.spriteH, 0 - 60, 0 - 45, this.player.spriteW / 4, this.player.spriteH / 4);
    // }
    // this.ctx.restore();
  }


  animate(): any {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.handleBubbles();
    this.updatePlayer();
    this.drawPlayer();
    this.ctx.fillStyle = 'Black';
    this.ctx.fillText('Score: ' + this.score, 20, 50);
    this.ctx.font = '50px Georgia';
    requestAnimationFrame(() => this.animate());
    this.gameFrame++;

  }

}
