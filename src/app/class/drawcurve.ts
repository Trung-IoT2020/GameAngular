// @ts-ignore
import Phaser from 'phaser';
import {delay} from 'rxjs/operators';

export class DrawCurve extends Phaser.Scene {
  player!: any;
  tank!: any;
  turret!: any;
  flame!: any;
  bullet!: any;
  background!: any;
  targets!: any;
  land!: any;
  emitter!: any;
  power!: any;
  time!: any;
  s!: any;
  powerText!: any;
  cursors!: any;
  fireButton!: any;
  add!: any;
  physics!: any;
  input!: any;
  load: any;
  camera!: any;
  cameras!: any;
  canvas!: any;
  textures!: any;
  flameTween!: any;
  tweens!: any;
  cameraTween!: any;
  header!: any;
  handLeft!: any;
  handRight!: any;
  arrow!: any;
  count = 0;
  tempBullet = 0;
  flying!: any;
  anims!: any;
  keyRest!: any;
  scene!: any;

  powerTextCount: any;
  powerTextTime: any;


  constructor() {
    super('DrawCurve');
    this.tank = null;
    this.header = null;
    this.turret = null;
    this.handLeft = null;
    this.handRight = null;
    this.scene = null;
    this.arrow = null;

    this.flame = null;
    this.bullet = null;

    this.background = null;
    this.targets = null;
    this.land = null;
    this.emitter = null;

    this.power = 300;
    this.time = 0;
    this.s = 0;
    this.powerText = null;
    this.powerTextCount = null;
    this.powerTextTime = null;
    this.cursors = null;
    this.fireButton = null;
    this.flying = null;
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


  create(): any {
    // ?????t gi???i h???n m??y ???nh b???ng k??ch th?????c c???a h??nh ???nh ?????t
    this.cameras.main.setBounds(0, 0, 992, 480);
    this.camera = this.cameras.main;
    this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    // C??c m???c ti??u c???n ????nh (???n sau ?????t m???t ch??t)
    this.anims.create({
      key: 'flying2',
      frames: this.anims.generateFrameNames('flying', {prefix: 'image', start: 1, end: 9, zeroPad: 2}),
      repeat: -1,
    });
    this.targets = this.physics.add.group();
    while (this.count <= 5) {
      this.targets.create((Math.random() * (972 - 300 + 1) + 284), Math.random() * (400 - 50 + 1) + 100, 'flying').play('flying2');
      this.count += 1;
      console.log(this.count);
    }
    this.targets.children.each((target) => {
      console.log('win');
      target.setOrigin(0);
      target.body.setAllowGravity(false);
    });
    // b???n truy c???p tr??nh qu???n l?? Texture (m???t l???p singleton) th??ng qua scene.textures
    // createCanvas t???o m???t K???t c???u m???i b???ng c??ch s??? d???ng ph???n t??? Canvas tr???ng c?? k??ch th?????c ???? cho
    this.canvas = this.textures.createCanvas('canvastexture', 992, 480);
    // B??y gi???, hi???n th??? K???t c???u Canvas b???ng c??ch th??m n?? v??o H??nh ???nh
    this.add.image(0, 0, 'canvastexture').setOrigin(0);
    // thu???c t??nh globalCompositeOperation ?????t ho???c tr??? v??? c??ch m???t h??nh ???nh ngu???n s??ng l??n m???t iamge ????ch
    // '????ch-out' v??? c?? b???n c?? ngh??a l?? m???t ph???n c???a h??nh ???nh ????ch ???????c v??? b???i h??nh ???nh ngu???n s??? trong su???t
    // this.canvas.context.globalCompositeOperation = 'destination-out';
    // B??y gi??? b???t c??? th??? g?? ???????c v??? v??o canvas s??? s??? d???ng t??y ch???n n??y
    this.emitter = this.add.particles('flame').createEmitter({
      speedX: {min: -120, max: 120},
      speedY: {min: -200, max: -120},
      rotation: {min: -15, max: 15},
      lifespan: 2000,
      maxParticles: 30,
      quantity: 10,
      on: false
    });
    //  M???t vi??n ?????n duy nh???t m?? xe t??ng s??? b???n
    this.bullet = this.physics.add.sprite(100, 400, 'bullet');
    this.bullet.disableBody(true, true);
    this.tank = this.add.sprite(24, 400, 'tank').setOrigin(0);
    this.turret = this.add.sprite(this.tank.x + 10, this.tank.y - 15, 'turret').setOrigin(0);
    // Khi ch??ng ta b???n, vi??n l???a nh??? n??y s??? xu???t hi???n nhanh ch??ng ??? cu???i th??p ph??o
    this.flame = this.add.sprite(0, 0, 'flame');
    this.flame.setVisible(false);
    //  ???????c s??? d???ng ????? hi???n th??? s???c m???nh c???a c?? ????nh
    this.power = 300;
    this.time = 0;
    this.s = 0;
    this.powerText = this.add.text(8, 8, 'Power: 300', {font: '18px Arial', fill: '#ffffff'});
    this.powerTextCount = this.add.text(8, 28, 'Count: 0', {font: '18px Arial', fill: '#ffffff'});
    this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
    this.powerTextCount.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
    this.powerText.fixedToCamera = true;
    this.powerTextCount.fixedToCamera = true;
    //  M???t s??? ??i???u khi???n c?? b???n
    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.physics.add.overlap(this.bullet, this.targets, this.hitTarget, null, this);
  }

  update(time, delta): any {
    if (!this.keyRest) {
      // this.time += 1;
      // this.powerTextTime = 'Power: ' + this.time;
      // N???u vi??n ?????n ??ang bay, ch??ng t??i kh??ng ????? ch??ng ??i???u khi???n b???t c??? th??? g??
      if (this.bullet.active) {
        //  Bullet so v???i ?????t
        this.bulletVsLand();
      } else {
        //  Cho ph??p h??? ?????t c??ng su???t t??? 100 ?????n 600
        if (this.cursors.left.isDown && this.power > 100) {
          this.power -= 2;
        } else if (this.cursors.right.isDown && this.power < 600) {
          this.power += 2;
        }
        // Cho ph??p h??? ?????t g??c, gi???a -90 (h?????ng th???ng l??n) v?? 0 (h?????ng sang ph???i)
        if (this.cursors.up.isDown && this.turret.angle > -45) {
          this.turret.angle -= 1;
          this.turret.x -= 0.5;
          this.turret.y += 0.5;
          this.bullet.angle -= 1.3;

        } else if (this.cursors.down.isDown && this.turret.angle < 0) {
          console.log(this.turret);
          this.turret.angle += 1;
          this.bullet.angle += 1.3;
          this.turret.x += 0.5;
          this.turret.y -= 0.5;
        }
        if (Phaser.Input.Keyboard.JustDown(this.fireButton)) {
          this.s += 1;
          this.powerTextCount.text = 'Count: ' + this.s;
          this.fire();
        }
        this.tempBullet = this.bullet.angle;
        this.powerText.text = 'Power: ' + this.power;
      }
    } else {

      this.scene.restart();
      this.keyRest = false;
    }


  }


  bulletVsLand(): any {
    //  Simple bounds check
    if (this.bullet.x < 0 || this.bullet.x > 992 || this.bullet.y > 480) {
      this.removeBullet('undefined');
      return;
    }
    const x = Math.floor(this.bullet.x);
    const y = Math.floor(this.bullet.y);
    const rgba = this.canvas.getPixel(x, y);
    if (this.bullet.angle < 60) {
      this.bullet.angle += 0.5;
    }
    if (rgba.a > 0) {
      // this.canvas.context.beginPath();
      this.canvas.context.arc(x, y, 16, 0, Math.PI * 2);
      this.canvas.context.fill();
      this.canvas.update();
      this.removeBullet('undefined');

    }
  }

  fire(): any {
    if (this.bullet.active) {
      return;
    }
    //  ?????t l???i v??? tr?? c???a vi??n ?????n ??? v??? tr?? c???a th??p ph??o
    this.bullet.enableBody(true, this.turret.x + 20, this.turret.y + 35, true, true);
    //  Qu??? ?????o ph??ng c???a ch??ng t??i d???a tr??n g??c c???a th??p ph??o v?? s???c m???nh
    // console.log(this.physics.velocityFromAngle(this.turret.angle, this.power, this.bullet.body.velocity));
    this.physics.velocityFromAngle(this.turret.angle, this.power, this.bullet.body.velocity);
    //  B??y gi??? h??y t??nh xem ??i???m END c???a th??p ph??o ??? ????u
    const p = new Phaser.Geom.Point();
    Phaser.Math.RotateAroundDistance(p, this.turret.x, this.turret.y, this.turret.rotation + Math.PI / 2, 34);
    console.log(Phaser.Math.RotateAroundDistance(p, this.turret.x, this.turret.y, this.turret.rotation + Math.PI / 2, 34));
    // V?? ?????nh v??? ng???n l???a ??? ????
    this.flameTween = this.tweens.add({
      targets: this.flame,
      alpha: 0,
      duration: 1000,
      ease: 'Linear'
    });
    //  V?? v???y, ch??ng ta c?? th??? th???y ??i???u g?? ??ang x???y ra khi vi??n ?????n r???i kh???i m??n h??nh
    this.cameras.main.startFollow(this.bullet);

  }

  hitTarget(bullet, target): any {
    const {x, y} = bullet;
    this.emitter.emitParticleAt(x, y);
    target.disableBody(true, true);
    this.removeBullet(true);
    this.count--;
    if (this.count === 0) {
      console.log('YOU WIN');
      this.scene.restart();

    }

  }

  removeBullet(hasExploded: any): any {
    console.log(hasExploded);
    this.bullet.angle = this.tempBullet;
    if (typeof hasExploded === 'undefined') {
      hasExploded = false;
    }
    this.bullet.disableBody(true, true);
    this.camera.stopFollow();
    // tslint:disable-next-line:no-shadowed-variable
    let delay = 1000;
    if (hasExploded) {
      delay = 2000;
    }

    this.cameraTween = this.tweens.add({
      targets: this.camera,
      scrollX: 0,
      duration: 1000,
      ease: 'Quintic.Out',
      delay
    });
  }


}

