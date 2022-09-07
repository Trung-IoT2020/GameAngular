import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameHomeComponent} from './game-home/game-home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GameTzfnComponent} from './game-tzfn/game-tzfn.component';
import {FishEatBubblesComponent} from './fish-eat-bubbles/fish-eat-bubbles.component';
import {FishEatComponent} from './fish-eat/fish-eat.component';
import {VariableSmoothStepComponent} from './variable-smooth-step/variable-smooth-step.component';

@NgModule({
  declarations: [
    AppComponent,
    GameHomeComponent,
    GameTzfnComponent,
    FishEatBubblesComponent,
    FishEatComponent,
    VariableSmoothStepComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [AppComponent, GameHomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
