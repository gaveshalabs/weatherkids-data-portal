// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';

// @Component({
//     selector: 'ngx-kite',
//     templateUrl: './kite-dashboard.component.html',
//     styleUrls: ['./kite-dashboard.component.scss'],
// })
// export class KiteDashboardComponent implements OnInit {

//     public getCoordinatesValue: any;
//     actualLocations: Array<[number, number]> = [];

//     constructor(private http: HttpClient) {

//     }

//     ngOnInit(): void {
//         this.getMethod();
//     }

//     public getMethod() {
//         this.http.get('https://data-api.gavesha.space/api').subscribe((data) => {
//             this.getCoordinatesValue = data;
//         });
//     }

//     mockLocations: Array<[number, number] | { lat: number; lng: number }> = [
//         [7.8731, 80.7718],
//         [6.9271, 79.8612],
//         [6.9275, 79.8610],
//         [7.2964, 80.6350],
//         [6.9273, 79.8829],
//         [6.9462, 79.8630],
//         [7.4920, 80.3548],
//         [6.9055, 79.9727],
//         [6.0397, 80.2180],
//         [6.9275, 79.9864],
//         [9.6615, 80.0255],
//     ];

// }


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite-dashboard.component.html',
    // styleUrls: ['./kite-dashboard.component.scss'],
})
export class KiteDashboardComponent implements OnInit {

    //   public getCoordinatesValue: any;
    //   actualLocations: Array<[number, number]> = [];
    //   mockLocations: Array<[number, number] | { lat: number; lng: number }> = [
    //     [7.8731, 80.7718],
    //     [6.9271, 79.8612],
    //     [6.9275, 79.8610],
    //     [7.2964, 80.6350],
    //     [6.9273, 79.8829],
    //     [6.9462, 79.8630],
    //     [7.4920, 80.3548],
    //     [6.9055, 79.9727],
    //     [6.0397, 80.2180],
    //     [6.9275, 79.9864],
    //     [9.6615, 80.0255],
    //   ];

    topPlayers = [];

    players = [];

    currentPlayer: any;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
    // this.getMethod();

        const routeStatePlayer = this._router.getCurrentNavigation()?.extras.state?.player as any;

        this.route.params.subscribe(params => {
            const playerId = params['playerId'];
            // console.log('Current player ID:', playerId);
            if (!this.isPlayerIdValid(playerId, routeStatePlayer)) {
                // console.log('Invalid player ID or mismatched state data', playerId);
                // Handle invalid player ID or mismatched state data
                // Example: Redirect to a different page or show an error message
            } else {
                // console.log('Valid player ID:', playerId);
                // Valid player ID, proceed with rendering the player details
                this._renderPlayerDetails(playerId);
            }
        });
    }

    //   public getMethod() {
    //     this.http.get('https://data-api.gavesha.space/api').subscribe((data) => {
    //       this.getCoordinatesValue = data;
    //     });
    //   }

    goToPlayerIntroduction(player: any) {
        this._router.navigate([`/kite/player/${player.id}`]);
    }

    goToBestPlayerIntroduction() {
        this._router.navigate([`/kite/player/${this.topPlayers[0].id}`]);
    }

    private isPlayerIdValid(playerId: string, routeStatePlayer: any): boolean {
        if (!routeStatePlayer) {
            return false;
        }
        return [...this.topPlayers, ...this.players].some(player => player.id === playerId);
    }

    private _renderPlayerDetails(playerId: string) {
        this.currentPlayer = [...this.topPlayers, ...this.players].find(player => player.id === playerId);
        // console.log('Rendering player details for:', this.currentPlayer);
    }
}







