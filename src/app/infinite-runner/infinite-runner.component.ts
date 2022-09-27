import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Phaser from 'phaser';
import Preloader from '../class/scenes/Preloader';
import Game from '../class/scenes/Game';
import GameOver from '../class/scenes/GameOver';
@Component({
  selector: 'app-infinite-runner',
  templateUrl: './infinite-runner.component.html',
  styleUrls: ['./infinite-runner.component.scss']
})
export class InfiniteRunnerComponent implements OnInit {
  config: Phaser.Types.Core.GameConfig;
  game: Phaser.Game;
  constructor() { }
  ngOnInit(): void {
    this.config =
      {
        type: Phaser.AUTO,
        width:  '100vw',
        height: '100vh',
        backgroundColor: 0x000000,
        pixelArt: true,
        physics: {
          default: 'arcade',
          arcade: {gravity: {y: 100}}
        },
        scene: [Preloader, Game, GameOver]
      };
    this.game = new Phaser.Game(this.config);
    // window.focus();
    // this.resize();
    // window.addEventListener('resize', this.resize, false);
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

}
