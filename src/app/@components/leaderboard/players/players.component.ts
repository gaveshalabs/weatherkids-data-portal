import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../leaderboard.interface';

@Component({
    selector: 'ngx-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})
export class PlayersComponent {
    @Input() players: Player[] = [];
    hoverPlayer: Player | null = null;

    constructor(private router: Router) {}

    goToPlayerIntroduction(player: Player) {
        this.router.navigate(['/kite/player', player.id]);
    }


    getPlayerImageUrl(imgtopUrl: string): string {
        if (!imgtopUrl) {
            // Handle the case where imgtopUrl is undefined or null
            return 'assets/default-image-url.jpg'; // Replace with your default image URL
        }

        // Check if the imgUrl is already in the desired format
        if (imgtopUrl.startsWith('assets/avatars/Avatar_Icons/')) {
            return imgtopUrl; // Return as-is if already in the correct format
        }

        // Extract the filename from the full imgUrl
        const filename = imgtopUrl.substring(imgtopUrl.lastIndexOf('/') + 1);

        // Construct the mock data-like URL
        const mocktopDataUrl = `assets/avatars/Avatar_Icons/${filename}`;

        return mocktopDataUrl;
    }

}
