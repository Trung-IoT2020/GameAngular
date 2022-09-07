import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Phaser from 'phaser';
import {Cannon} from '../class/cannon';


@Component({
  selector: 'app-variable-smooth-step',
  templateUrl: './variable-smooth-step.component.html',
  styleUrls: ['./variable-smooth-step.component.scss']
})


export class VariableSmoothStepComponent implements OnInit{
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  player1: any;

  constructor() {

  }

  ngOnInit(): any {
    this.player1 = new Cannon();
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-example',
      backgroundColor: '#9adaea',
      useTicker: true,
      scene: {
        preload: this.player1.preload,
        create: this.player1.create,
        update: this.player1.update
      }
    };
    this.phaserGame = new Phaser.Game(this.config);
    console.log(this.phaserGame);
  }
}
