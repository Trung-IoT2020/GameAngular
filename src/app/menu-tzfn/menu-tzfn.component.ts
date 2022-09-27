import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-tzfn',
  templateUrl: './menu-tzfn.component.html',
  styleUrls: ['./menu-tzfn.component.scss']
})
export class MenuTzfnComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  runGame(): any {
    this.router.navigate(['/game-fish/2048']);
  }

}
