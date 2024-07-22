import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../leaderboard.interface';

@Component({
    selector: 'ngx-best-player',
    templateUrl: './best-player.component.html',
    styleUrls: ['./best-player.component.scss'],
})
export class BestPlayerComponent {
    @Input() bestPlayer: Player;

    constructor(private router: Router) {}

    goToBestPlayerIntroduction() {
        this.router.navigate(['/kite/player', this.bestPlayer.id]);
    }

    getImageUrl(imgUrl: string): string {
    // Check if the imgUrl is already in the desired format
        if (imgUrl.startsWith('assets/avatars/Avatar_Icons/')) {
            return imgUrl; // Return as-is if already in the correct format
        }

        // Extract the filename from the full imgUrl
        const filename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);

        // Construct the mock data-like URL
        const mockDataUrl = `assets/avatars/Avatar_Icons/${filename}`;

        return mockDataUrl;
    }

}
