import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Phaser from 'phaser';
import {Cannon} from '../class/cannon';
import {DrawCurve} from '../class/drawcurve';
import {mainMenuDrawCurve} from '../class/menu-draw-curve';

@Component({
  selector: 'app-draw-curve',
  templateUrl: './draw-curve.component.html',
  styleUrls: ['./draw-curve.component.scss']
})
export class DrawCurveComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  DrawCurve: any;

  constructor() {

  }

  game: Phaser.Game;
  gameWin: any = 'YOUS';
  sumCount: any = 0;
  timeCount: any = 0;
  mainMenuDrawCurve: any;

  getData(): any {
    const keySum = sessionStorage.getItem('sumCount');
    const gameWin = sessionStorage.getItem('gameWin');

    if (gameWin === 'YOU WIN') {
      this.gameWin = gameWin;
      console.log('Win');
      this.sumCount = keySum;
    }
    requestAnimationFrame(() => this.getData());
  }

  ngOnInit(): any {
    this.getData();
    // this.DrawCurve = new DrawCurve();
    // this.mainMenuDrawCurve = new mainMenuDrawCurve();
    this.config = {
      type: Phaser.AUTO,
      width:  '100vw',
      height: '100vh',
      backgroundColor: 0x000000,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {gravity: {y: 100}}
      },
      scene: [DrawCurve]
    };
    this.game = new Phaser.Game(this.config);
    window.focus();
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  resize(): any {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = Number(this.game.config.width) / Number(this.game.config.height);
    if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + 'px';
      canvas.style.height = (windowWidth / gameRatio) + 'px';
    } else {
      canvas.style.width = (windowHeight * gameRatio) + 'px';
      canvas.style.height = windowHeight + 'px';
    }
  }

  shakeAndRestart(): any {
    // this.cameras.main.shake(800, 0.01);
    // this.time.addEvent({
    //   delay: 2000,
    //   callbackScope: this,
    //   callback: function(){
    //     this.scene.start("playGame");
    //   }
    // })
  }


}
