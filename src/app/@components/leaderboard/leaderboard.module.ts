import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayersComponent } from './players/players.component';
import { BestPlayerComponent } from './best-player/best-player.component';
import { KiteLeaderboardComponent } from './leaderboard/leaderboard.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { MatListModule } from '@angular/material/list';
import { KiteApiService } from '../../pages/kite-competition/kite/kite-api.service';

@NgModule({
    declarations: [
        BestPlayerComponent,
        KiteLeaderboardComponent,
        TopPlayersComponent,
        PlayersComponent,

    ],
    imports: [
        CommonModule,
        MatListModule,

    ],
    exports: [
        KiteLeaderboardComponent,
    ],

    providers: [
        KiteApiService,
    ],
})
export class LeaderboardModule {}
