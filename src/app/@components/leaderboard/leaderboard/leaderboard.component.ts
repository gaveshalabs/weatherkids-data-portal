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
        // Sort players by kite height in descending order
        data.sort((a, b) => parseInt(b.kite_height) - parseInt(a.kite_height));
        
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

  goToPlayerIntroduction(playerId: string) {
    this.router.navigate(['/kite/player', playerId]);
  }

  goToBestPlayerIntroduction() {
    if (this.bestPlayer) {
      this.router.navigate(['/kite/player', this.bestPlayer.id]);
    }
  }

}


