import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { LeaderboardModule } from '../../@components/leaderboard/leaderboard.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { KiteCompetitionMapComponent } from './kite-map/kite-map.component';
import { KiteComponent } from './kite/kite.component';
import { RegisterNowComponent } from './register-now-dialog/register-dialog.component';



@NgModule({
  declarations: [
    RegisterNowComponent,
    KiteComponent,
    KiteCompetitionMapComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
          path: '',
          component: KiteComponent,
      },
  ]),
    MatDialogModule,
    MatListModule,
    LeaderboardModule,
    SharedModule,
  ],
  exports: [
  ],
})
export class KiteCompetitionModule {

}
