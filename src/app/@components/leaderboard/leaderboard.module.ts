import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayersComponent } from '../../pages/kite-competition/players/players.component';
import { BestPlayerComponent } from './best-player/best-player.component';
import { KiteLeaderboardComponent } from './leaderboard/leaderboard.component';
import { TopPlayersComponent } from './top-players/top-players.component';



@NgModule({
  declarations: [
    BestPlayerComponent,
    KiteLeaderboardComponent,
    TopPlayersComponent,

  ],
  imports: [
    CommonModule,
    PlayersComponent,
  ],
  exports:[
    KiteLeaderboardComponent,
  ]
})
export class LeaderboardModule { }
