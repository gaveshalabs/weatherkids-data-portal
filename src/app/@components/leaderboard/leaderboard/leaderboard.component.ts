import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../leaderboard.interface';
import { KiteApiService } from '../../../pages/kite-competition/kite/kite-api.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { PlayersComponent } from '../players/players.component';
import { LoaderService } from '../../../@theme/components/loader/loader.service';


@Component({
    selector: 'ngx-kite-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss'],
})
export class KiteLeaderboardComponent implements OnInit {

    @ViewChild(PlayersComponent) playersComponent: PlayersComponent;
    topPlayers: Player[] = [];
    bestPlayer: Player;
    remainingPlayers: Player[] = [];
    combinedPlayers: Player[] = []; // Combined list of top and remaining players

    constructor(
        private router: Router,
        private kiteApiService: KiteApiService,
        private sharedDataService: SharedDataService,
        private loaderService: LoaderService,
    ) {}

    ngOnInit(): void {
        this.loadLeaderboard();
    }

    loadLeaderboard() {
        this.loaderService.show();
        this.kiteApiService.getPlayersLeaderboard().subscribe(
            (data) => {
                // Sort players by kite height in descending order
                data.sort((a, b) => parseInt(b.kite_height, 10) - parseInt(a.kite_height, 10));

                // Assign ranks to players
                data.forEach((player, index) => {
                    if (index === 0) {
                        player.rank = '1st';
                    } else if (index === 1) {
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

                // Combine top and remaining players for search
                this.combinedPlayers = [...this.topPlayers, ...this.remainingPlayers];
                console.log('Combined Players:', this.combinedPlayers);
                this.sharedDataService.setPlayers(this.combinedPlayers);
            },
            (error) => {
                console.error('Error fetching leaderboard:', error);
            },
            () => {
                this.loaderService.hide();
            }
        );
    }
    navigateToAllPlayers() {
        this.router.navigate(['/kite/player/all']);
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

    // selectTopPlayer(player: Player) {
    //     if (this.playersComponent) {
    //         this.playersComponent.clearHoverAndActiveState();
    //     }

    //     // Clear the activePlayerId from local storage
    //     localStorage.removeItem('activePlayerId');

    //     this.router.navigate(['/kite/player', player.id], {
    //         state: {
    //             player,
    //         },
    //     });
    // }

}


