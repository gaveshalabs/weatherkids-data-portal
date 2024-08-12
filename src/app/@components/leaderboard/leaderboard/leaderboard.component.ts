import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../leaderboard.interface';
import { KiteApiService } from '../../../pages/kite-competition/kite/kite-api.service';
import { PlayersComponent } from '../players/players.component';

@Component({
    selector: 'ngx-kite-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss'],
})
export class KiteLeaderboardComponent implements OnInit {
    @ViewChild(PlayersComponent) playersComponent: PlayersComponent; // Access PlayersComponent

    topPlayers: Player[] = [];
    bestPlayer: Player;
    remainingPlayers: Player[] = [];

    constructor(private router: Router, private kiteApiService: KiteApiService) {}

    ngOnInit(): void {
        this.loadLeaderboard();
    }

    loadLeaderboard() {
        this.kiteApiService.getPlayersLeaderboard().subscribe(
            (data) => {
                data.sort((a, b) => parseInt(b.kite_height, 10) - parseInt(a.kite_height, 10));

                data.forEach((player, index) => {
                    if (index === 1) {
                        player.rank = '2nd';
                    } else if (index === 2) {
                        player.rank = '3rd';
                    } else {
                        player.rank = `${index + 1}`;
                    }
                });

                // Assign top 3 players
                this.topPlayers = data.slice(0, 3);

                // Assign best player
                this.bestPlayer = this.topPlayers[0];

                // Assign remaining players
                this.remainingPlayers = data.slice(3);
            },
            (error) => {
                console.error('Error fetching leaderboard:', error);
            }
        );
    }

    selectTopPlayer(player: Player) {
        if (this.playersComponent) {
            this.playersComponent.clearHoverAndActiveState();
        }
        this.router.navigate(['/kite/player', player.id], {
            state: {
                player,
            },
        });
    }
}
