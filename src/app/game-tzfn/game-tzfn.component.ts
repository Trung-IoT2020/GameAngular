import {Component, OnInit, ElementRef, Renderer2, HostListener} from '@angular/core';

@Component({
  selector: 'app-game-tzfn',
  templateUrl: './game-tzfn.component.html',
  styleUrls: ['./game-tzfn.component.scss']
})
export class GameTzfnComponent implements OnInit {
  gameOver = false;
  x: number;
  y: number;
  defaultTouch = {x: 0, y: 0, time: 0};
  sumCount = 0;

  constructor(public renderer: Renderer2, private el: ElementRef) {
  }


  public placesDefault: any[] = [
    [2, '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ];
  public places: any[] = [
    [2, '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ];

  public pl = {
    0: {x: 0, y: -1}, // up
    1: {x: 1, y: 0}, // right
    2: {x: 0, y: 1}, // down
    3: {x: -1, y: 0} // left
  };
  public repeat = false;
  public cellsConnect = false;
  public numberAdded = false;
  public win = false;
  public clickActive = false;
  public indexAddNumber = {x: 0, y: 0};


  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  handleTouch(event: any): any {
    const touch = event.touches[0] || event.changedTouches[0];
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      const deltaX = touch.pageX - this.defaultTouch.x;
      const deltaY = touch.pageY - this.defaultTouch.y;
      const deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 60) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            this.doSwipeRight(event);
          } else {
            this.doSwipeLeft(event);
          }
        }

        if (Math.abs(deltaY) > 60) {
          // delta y is at least 60 pixels
          if (deltaY > 0) {
            this.doSwipeDown(event);
          } else {
            this.doSwipeUp(event);
          }
        }
      }
    }
  }

  doSwipeLeft(event): any {
    // console.log('swipe left', event);
    if (!this.win || !this.gameOver) {
      this.clickLimit();
      this.swipe(3);

    }
  }

  doSwipeRight(event): any {
    // console.log('swipe right', event);
    if (!this.win || !this.gameOver) {
      this.clickLimit();
      this.swipe(1);
    }
  }

  doSwipeUp(event): any {
    // console.log('swipe up', event);
    if (!this.win || !this.gameOver) {
      this.clickLimit();
      this.swipe(0);
    }
  }

  doSwipeDown(event): any {
    // console.log('swipe down', event);
    if (!this.win || !this.gameOver) {
      this.clickLimit();
      this.swipe(2);
    }
  }

  color(e: any): any {
    console.log(e);
    if (e === 2) {
      return 'rgb(233,233,233)';
    } else if (e === 4) {
      return '#ede0c8';
    } else if (e === 8) {
      return '#f2b179';
    } else if (e === 16) {
      return '#3498db';
    } else if (e === 32) {
      return '#2ecc71';
    } else if (e === 64) {
      return '#f1c40f';
    } else if (e === 128) {
      return '#3498db';
    } else if (e === 256) {
      return '#2ecc71';
    } else if (e === 512) {
      return '#7FC400';
    } else if (e === 1024) {
      return '#FFD583';
    } else if (e === 2048) {
      return 'red';
    } else {
      return 'rgb(233,233,233)';
    }
    // return 'red';
  }

  ngOnInit(): void {
    this.addNumber();
    document.addEventListener('keydown', (e) => {
      if (!this.win || !this.gameOver) {
        if (!this.clickActive && e.keyCode === 37 || e.keyCode === 100) { // left
          this.clickLimit();
          this.swipe(3);
        } else if (!this.clickActive && e.keyCode === 38 || e.keyCode === 104) { // up
          this.clickLimit();
          this.swipe(0);
        } else if (!this.clickActive && e.keyCode === 39 || e.keyCode === 102) { // right
          this.clickLimit();
          this.swipe(1);
        } else if (!this.clickActive && e.keyCode === 40 || e.keyCode === 98) { // down
          this.clickLimit();
          this.swipe(2);
        }
      }
    });
  }

  addNumber(): any {
    // tslint:disable-next-line:variable-name
    const number = Math.random() < 0.8 ? 2 : 4;
    const index = (this.random(1, 16) - 1);
    return this.searchEmptyCell(index, number);
  }

  clickLimit(): any {
    this.clickActive = true;
    setTimeout(() => {
      this.clickActive = false;
    }, 200);
  }

  cells(position): any {
    return position.x >= 0 && position.x < this.places.length &&
      position.y >= 0 && position.y < this.places.length;
  }

  checkFreeCells(): any {
    for (let i = 0; i < this.places.length; i++) {
      if (this.places[i].indexOf('') >= 0) {
        return this.places[i].indexOf('') + (i * 4);
      }
    }
    return -1;
  }

  // tslint:disable-next-line:variable-name
  searchEmptyCell(indexNewNumber: any, number: any): any {
    const x = Math.floor(indexNewNumber / 4);
    let y = ((indexNewNumber + 1) % 4) === 0 ? 3 : (indexNewNumber + 1) % 4 - 1;

    if (this.places[x][y] === '') {
      this.places[x][y] = number;
      return {y, x};
    } else if (this.places[x][y] !== '' && y > 0) {
      y -= 1;
      return this.searchEmptyCell(y, number);
    } else {
      return this.searchEmptyCell(this.checkFreeCells(), number);
    }
  }

  filterEmptyElem(next, act): any {
    this.repeat = false;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        this.filterElem(y, x, next, act);
      }
    }

    if (this.repeat) {
      this.filterEmptyElem(next, act);
    }
  }

  filterEmptyElemReverse(next, act): any {
    this.repeat = false;
    for (let y = 3; y >= 0; y--) {
      for (let x = 3; x >= 0; x--) {
        this.filterElem(y, x, next, act);
      }
    }

    if (this.repeat) {
      this.filterEmptyElemReverse(next, act);
    }
  }

  filterElem(y, x, next, act): any {
    const tile = this.cells({y, x});
    if (tile) {
      const other = {y: y + next.y, x: x + next.x};
      const cell = this.cells(other);
      act.call(this, y, x, next, cell);
    }
  }

  cellTransition(y, x, next, cell): any {
    if (cell && this.places[y][x] && !this.places[y + next.y][x + next.x]) {

      this.places[y + next.y][x + next.x] = this.places[y][x];
      this.places[y][x] = '';
      this.repeat = true;
      this.numberAdded = true;

    } else if (cell && this.places[y][x] === this.places[y + next.y][x + next.x]) {
      this.cellsConnect = true;
    }
  }


  cellConnect(y, x, next, cell): any {
    if (cell && this.places[y][x] && this.places[y][x] === this.places[y + next.y][x + next.x]) {
      console.log(this.sumCount, this.places[y][x]);
      this.places[y + next.y][x + next.x] += this.places[y][x];
      this.sumCount += this.places[y][x];
      this.places[y][x] = '';
      this.numberAdded = true;
    }
    if (cell && this.places[y + next.y][x + next.x] === 2048) {
      this.win = true;

    }
  }

  random(min, max): any {
    return (Math.floor(Math.random() * (max - min)) + min);
  }

  swipe(action): any {
    this.numberAdded = false;

    if (action === 0 || action === 3) {
      this.filterEmptyElem(this.pl[action], this.cellTransition);
      if (this.cellsConnect) {
        this.filterEmptyElem(this.pl[action], this.cellConnect);
        this.filterEmptyElem(this.pl[action], this.cellTransition);
      }
    } else {
      this.filterEmptyElemReverse(this.pl[action], this.cellTransition);
      if (this.cellsConnect) {
        this.filterEmptyElemReverse(this.pl[action], this.cellConnect);
        this.filterEmptyElemReverse(this.pl[action], this.cellTransition);
      }
    }

    if (this.win) {
      this.victory();
    } else if (this.numberAdded) {
      this.indexAddNumber = this.addNumber();
    }
    if (this.checkFreeCells() === -1 && !this.checkMoves(this.indexAddNumber, this.pl)) {
      console.log('Fail');
      this.gameOver = true;
    }
  }


  closePopup(): any {
    this.places = [];
    this.placesDefault = [
      [2, '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];
    this.places = [
      [2, '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];
    this.pl = {
      0: {x: 0, y: -1}, // up
      1: {x: 1, y: 0}, // right
      2: {x: 0, y: 1}, // down
      3: {x: -1, y: 0} // left
    };
    this.addNumber();
    this.win = false;
    this.gameOver = false;
    this.sumCount = 0;

  }

  checkMoves(el: any, pl: any): any {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          this.cells({y: el.y + pl[i].y, x: el.x + pl[i].x}) &&
          this.places[i][j] === this.places[i][j + 1] ||
          (i < 3 && this.places[i][j] === this.places[i + 1][j])
        ) {
          return true;
        } else if (i === 3 && this.places[i][j] === this.places[i][j + 1]) {
          return true;
        }
      }
    }
    return false;
  }

  victory(): any {
    console.log('you victory');
  }
}
