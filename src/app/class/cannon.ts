// @ts-ignore
import Phaser from 'phaser';

export class Cannon extends Phaser.Scene {

  constructor() {
    super({key: 'new'});
  }

  bullet1!: any;
  speed1!: any;
  load!: any;
  delta!: any;
  add!: any;
  cursors!: any;
  input!: any;
  lastFired = 0;
  // cannon_header: any;
  // pathItems: any;
  // firstMarker: any;

  temp: any;
  check = false;
  lastMarker: any;

  preload(): any {
    this.load.setBaseURL('');
    this.load.image('bullet', 'assets/images/bullet-bill.png');
    this.load.image('cannon-body', 'assets/images/cannon_body.png');
    this.load.image('cannon-header', 'assets/images/cannon_head.png');
    this.load.image('ground', 'assets/images/ground.png');
  }

  create(): any {
    this.add.image(0, 500, 'ground').setOrigin(0);

    this.bullet1 = this.add.image(64, 372, 'bullet').setOrigin(0);

    this.speed1 = Phaser.Math.GetSpeed(600, 100);

    this.add.image(64, 410, 'cannon-body').setOrigin(0);
    this.add.image(64, 362, 'cannon-header').setOrigin(0);
    // this.add.existing(this.cannon_header);
    this.add.text(64, 50, '600px / 6 secs', {fill: '#000'});
    this.cursors = this.input.keyboard.createCursorKeys();
    this.lastFired = 0;
    this.temp = 0;
    this.check = false;
    // this.firstMarker = this.add.arc(-10, 0, 5, 0, 2 * Math.PI, true, 0xffffff);
    // this.pathItems = this.add.group();
  }

  update(time, delta): any {

    // const {x, y} = this.firstMarker;
    // if (!this.lastMarker || Phaser.Math.Distance.Between(x, y, this.lastMarker.x, this.lastMarker.y) > 20) {
    //   const marker = this.add.arc(x, y, 3, 0, 2 * Math.PI, true, 0xcdcdcd);
    //   this.pathItems.add(marker);
    //   this.lastMarker = {x, y};
    // }
    // this.cannon_header.rotation += 0.01;
    if (Number(this.bullet1.x) > 864) {
      this.check = false;
      this.bullet1.x = 64;
      this.lastFired = 0;
    } else {
      if (!this.check) {
        if (this.cursors.space.isDown) {
          this.check = true;
        }
      } else {
        this.bullet1.x += this.speed1 * delta;
        this.temp = this.bullet1.x;
        this.lastFired = time + 50;
        requestAnimationFrame(() => {
          this.update(time, delta);
        });
      }


    }

  }
}
