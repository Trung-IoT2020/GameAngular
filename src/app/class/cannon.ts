// @ts-ignore
import Phaser from 'phaser';

export class Cannon extends Phaser.Scene {
  bullet1!: any;
  speed1!: any;
  load!: any;
  delta!: any;
  add!: any;
  cursors!: any;
  input!: any;
  lastFired = 0;

  constructor() {
    super({key: 'new'});
  }

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

    this.add.text(64, 50, '600px / 6 secs', {fill: '#000'});
    this.cursors = this.input.keyboard.createCursorKeys();
    this.lastFired = 0;
    this.temp = 0;
    this.check = false;

  }



  temp: any;
  check = false;

  update(time, delta): any {


    // console.log(this.cursors.up.isDown, this.temp);
    console.log(this.cursors);
    console.log(this.cursors);
    if (Number(this.bullet1.x) > 864) {
      this.check = false;
      this.bullet1.x = 64;
      this.lastFired = 0;
    } else {

      if (!this.check) {
        if(this.cursors.space .isDown){
          this.check = true;
        }
      }else{
        this.bullet1.x += this.speed1 * delta;
        this.temp = this.bullet1.x;
        this.lastFired = time + 50;
        requestAnimationFrame(() => {
          this.update(time, delta);
        });
      }



    }


    // this.bullet2.x += this.speed2 * this.delta;
    //
    // if (this.bullet2.x > 864)
    // {
    //   this.bullet2.x = 64;
    // }
  }
}
