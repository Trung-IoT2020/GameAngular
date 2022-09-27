// @ts-ignore
import Phaser from 'phaser';

// tslint:disable-next-line:class-name
export class mainMenuDrawCurve extends Phaser.Scene {
  add: any;
  scale: any;
  scene: any;
  load: any;

  constructor() {
    super('mainMenuDrawCurve');
  }

  create(): any {
    this.add.text(this.scale.width / 2, this.scale.height / 3, 'Welcome to Stick Hero game', {
      fontFamily: 'Arial',
      fontSize: '34px',
    }).setOrigin(0.5);

    const playBtn = this.add
      .rectangle(this.scale.width / 2, 9 * this.scale.height / 10, 3 * this.scale.width / 4, 0.8 * this.scale.height / 10, 0xffca27)
      .setInteractive({useHandCursor: true});

    const playBtnText = this.add
      .text(this.scale.width / 2, 9 * this.scale.height / 10, 'Begin', {
        fontFamily: 'Arial',
        fontSize: '32px',
      })
      .setOrigin(0.5);

    playBtn.on('pointerdown', () => {
      this.scene.start('DrawCurve');
      console.log(this.scene.start('DrawCurve'));
    });

    playBtn.on('pointerover', () => {
      playBtn.setScale(1.1);
      playBtnText.setScale(1.1);
    });

    playBtn.on('pointerout', () => {
      playBtn.setScale(1);
      playBtnText.setScale(1);
    });
  }

  preload(): any {
    this.load.image('tank', 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/archery/body2.png');
    this.load.image('turret', 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/archery/arrow2.png');
    this.load.image('bullet', 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/archery/arrow1.png');
    this.load.image('background', 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/archery/BG2.png'); // 992 x 512 image
    this.load.image('flame', 'https://raw.githubusercontent.com/photonstorm/phaser-coding-tips/master/issue-002/assets/flame.png');
    this.load.atlas('flying', 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/archery/flying5.png', 'https://hi-static.fpt.vn/sys/hifpt/pnc_pdx/game-demo/archery/flying5_atlas.json');
    this.load.image('target', 'https://raw.githubusercontent.com/photonstorm/phaser-coding-tips/master/issue-002/assets/target.png');
  }

}
