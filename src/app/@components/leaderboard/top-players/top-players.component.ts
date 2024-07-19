// import { Component, Input } from '@angular/core';
// import { Router } from '@angular/router';
// import { Player } from '../leaderboard.interface';

// @Component({
//   selector: 'ngx-top-players',
//   templateUrl: './top-players.component.html',
//   styleUrls: ['./top-players.component.scss'],
// })
// export class TopPlayersComponent {
//   @Input() topPlayer: Player;

//   constructor(private router: Router) {}

//   goToPlayerIntroduction(player: Player) {
//     this.router.navigate(['/kite/player', player.id]);
//   }

//   getTopImageUrl(imgtopUrl: string): string {
//     // Check if the imgUrl is already in the desired format
//     if (imgtopUrl.startsWith('assets/avatars/Avatar_Icons/')) {
//       return imgtopUrl; // Return as-is if already in the correct format
//     }

//     // Extract the filename from the full imgUrl
//     const filename = imgtopUrl.substring(imgtopUrl.lastIndexOf('/') + 1);

//     // Construct the mock data-like URL
//     const mocktopDataUrl = `assets/avatars/Avatar_Icons/${filename}`;

//     return mocktopDataUrl;
//   }

// }



import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../leaderboard.interface';

@Component({
    selector: 'ngx-top-players',
    templateUrl: './top-players.component.html',
    styleUrls: ['./top-players.component.scss'],
})
export class TopPlayersComponent {
    @Input() topPlayer: Player;

    constructor(private router: Router) {}

    goToPlayerIntroduction(player: Player) {
        this.router.navigate(['/kite/player', player.id]);
    }

    getTopImageUrl(imgtopUrl: string): string {
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
