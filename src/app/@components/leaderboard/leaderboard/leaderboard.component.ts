import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../leaderboard.interface';
import { KiteApiService } from '../../../pages/kite-competition/kite/kite-api.service';

@Component({
    selector: 'ngx-kite-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss'],
})
export class KiteLeaderboardComponent implements OnInit {
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
                // data=[],
                // Sort players by kite height in descending order
                data.sort((a, b) => parseInt(b.kite_height, 10) - parseInt(a.kite_height, 10));

                // const topTenPlayers = data.slice(0, 10);

                // topTenPlayers.forEach((player, index) => {
                //     if (index === 1) {
                //         player.rank = '2nd';
                //     } else if (index === 2) {
                //         player.rank = '3rd';
                //     } else {
                //         player.rank = `${index + 1}`;
                //     }
                // });

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
                // Handle error as needed, e.g., show error message
            }
        );
    }


}


