import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players/players.component';
import { BestPlayerComponent } from './best-player/best-player.component';
import { KiteLeaderboardComponent } from './leaderboard/leaderboard.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { MatListModule } from '@angular/material/list';
import { KiteApiService } from '../../pages/kite-competition/kite/kite-api.service';
import { MyRecordsComponent } from './my-records/my-records.component';
import { NbCardModule } from '@nebular/theme';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        BestPlayerComponent,
        KiteLeaderboardComponent,
        TopPlayersComponent,
        PlayersComponent,
        MyRecordsComponent,
    ],
    imports: [
        CommonModule,
        MatListModule,
        NbCardModule,
        MatIconModule,
        MatInputModule,

    ],
    exports: [
        KiteLeaderboardComponent,
    ],
    providers: [
        KiteApiService,
    ],
})
export class LeaderboardModule {}





