// @ts-ignore
import Phaser from 'phaser';

import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class Preloader extends Phaser.Scene {
  load!: any;
  scene!: any;

  constructor() {
    super(SceneKeys.Preloader);
  }

  preload(): any {
    this.load.image(TextureKeys.Background, 'assets/images/house/bg_repeat_340x640.png');
    this.load.image(TextureKeys.MouseHole, 'assets/images/house/object_mousehole.png');
    this.load.image(TextureKeys.Window1, 'assets/images/house/object_window1.png');
    this.load.image(TextureKeys.Window2, 'assets/images/house/object_window2.png');

    this.load.image(TextureKeys.Bookcase1, 'assets/images/house/object_bookcase1.png');
    this.load.image(TextureKeys.Bookcase2, 'assets/images/house/object_bookcase2.png');

    this.load.image(TextureKeys.LaserEnd, 'assets/images/house/object_laser_end.png');
    this.load.image(TextureKeys.LaserMiddle, 'assets/images/house/object_laser.png');

    this.load.image(TextureKeys.Coin, 'assets/images/house/object_coin.png');

    this.load.atlas(TextureKeys.RocketMouse, 'assets/images/characters/rocket-mouse.png', 'assets/images/characters/rocket-mouse.json');
  }

  create(): any {
    this.scene.start(SceneKeys.Game);
  }
}
