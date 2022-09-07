import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {GameHomeComponent} from './game-home/game-home.component';
import {GameTzfnComponent} from './game-tzfn/game-tzfn.component';
import {FishEatBubblesComponent} from './fish-eat-bubbles/fish-eat-bubbles.component';
import {FishEatComponent} from './fish-eat/fish-eat.component';
import {VariableSmoothStepComponent} from './variable-smooth-step/variable-smooth-step.component';

const routes: Routes = [
  {
    path: 'game-fish', component: AppComponent,
    children: [
      {path: 'home', component: GameHomeComponent},
      {path: 'fish', component: FishEatBubblesComponent},
      {path: 'fish-test', component: FishEatComponent},
      {path: '2048', component: GameTzfnComponent},
      {path: 'cannon-smooth', component: VariableSmoothStepComponent},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
