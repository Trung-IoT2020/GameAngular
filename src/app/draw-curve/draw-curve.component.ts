import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Phaser from 'phaser';
import {Cannon} from '../class/cannon';
import {DrawCurve} from '../class/drawcurve';

@Component({
  selector: 'app-draw-curve',
  templateUrl: './draw-curve.component.html',
  styleUrls: ['./draw-curve.component.scss']
})
export class DrawCurveComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  player1: any;

  constructor() {

  }


  gameWin: any = 'YOUS';
  sumCount: any = 0;
  timeCount: any = 0;

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

  closePopup(): any {
    this.gameWin = 'YOUS';
    this.sumCount = 0;
    sessionStorage.setItem('sumCount', '0');
    sessionStorage.setItem('gameWin', 'YOUS');
    this.player1 = new DrawCurve(true);
    console.log(this.player1);
  }

  ngOnInit(): any {
    sessionStorage.setItem('sumCount', '0');
    sessionStorage.setItem('gameWin', 'YOUS');

    this.getData();
    this.player1 = new DrawCurve(false);
    this.config = {
      type: Phaser.CANVAS,
      width: 1024,
      height: 600,
      backgroundColor: 0x000000,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 200},
          debug: false
        }
      },
      scene: [this.player1]
    };
    this.phaserGame = new Phaser.Game(this.config);
    console.log(this.config);
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
