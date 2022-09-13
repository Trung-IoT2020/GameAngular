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

  ngOnInit(): any {
    this.player1 = new DrawCurve();
    this.config = {
      type: Phaser.CANVAS,
      width: 990,
      height: 500
      ,
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
    console.log(this.phaserGame);
  }



  shakeAndRestart():any {
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
