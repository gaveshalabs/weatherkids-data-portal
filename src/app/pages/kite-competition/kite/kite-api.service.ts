import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player, TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { kiteenvironment } from './kite-environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class KiteApiService {
    constructor(private httpClient: HttpClient) {}

    // getLatestDataForPlayer(kite_player_id: string) {
    //   return this.httpClient.get<KiteData>(
    //     `${kiteenvironment.apiBaseUrl}/latest/${kite_player_id}`
    //   ).pipe(
    //     catchError(error => {
    //       console.error('Error fetching latest data for player:', error);
    //       return throwError(error);
    //     })
    //   );
    // }

    // get all players to leaderboard
    getPlayersLeaderboard(): Observable<any> {
        return this.httpClient.get<any>(`${kiteenvironment.apiBaseUrl}/kite-data/players-leaderboard`);
    }

    getLatestDataByKitePlayerId(playerId: string): Observable<any> {
        return this.httpClient.get<any>
        (`${kiteenvironment.apiBaseUrl}/kite-data/latest?include=current_week/${playerId}`);
    }


    getLatestDataForAllPlayers(): Observable<TotalKiteData> {
        const url = `${kiteenvironment.apiBaseUrl}/kite-data/latest?include=current_week`;
        return this.httpClient.get<TotalKiteData>(url);
    }
}
