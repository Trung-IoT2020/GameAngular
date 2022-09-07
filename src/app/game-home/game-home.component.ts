import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import Phaser from 'phaser';

// tslint:disable-next-line:component-class-suffix
class NewScene extends Phaser.Scene {
  green: any;
  blue: any;
  greenKeys: any;
  blueKeys: any;
  load: any;
  physics: any;
  input: any;

  constructor() {
    super({key: 'new'});
  }

  preload(): any {
    this.load.setBaseURL('');
    this.load.image('greenBox', 'assets/images/ship.png');
  }

  create(): any {
    this.green = this.physics.add.image(300, 340, 'greenBox').setCollideWorldBounds(true);
    // console.log(this.blue );
    console.log(this.green);
    this.greenKeys = this.input.keyboard.createCursorKeys();


    this.physics.add.collider(this.green, null);
  }


  update(): any {
    if (this.greenKeys.left.isDown) {
      this.green.setVelocityX(-200);
    } else if (this.greenKeys.right.isDown) {
      this.green.setVelocityX(200);
    } else if (this.greenKeys.up.isDown) {
      this.green.setVelocityY(-200);
    } else if (this.greenKeys.down.isDown) {
      this.green.setVelocityY(200);
    } else if (!this.green.triggered) {
      this.green.setVelocity(0);
    }
  }
}

// tslint:disable-next-line:component-class-suffix
@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})


// @ts-ignore
export class GameHomeComponent implements OnInit, AfterViewInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scene: [NewScene],
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'gameContainer',
        height: 600,
        width: 600
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0}
        }
      }
    };
  }

  ngOnInit(): any {
    this.phaserGame = new Phaser.Game(this.config);
    console.log(this.phaserGame);
  }
}
