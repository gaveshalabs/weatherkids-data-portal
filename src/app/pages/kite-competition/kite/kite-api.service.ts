import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player, TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class KiteApiService {
    constructor(private httpClient: HttpClient) { }

    // get all players to leaderboard
    getPlayersLeaderboard(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiBaseUrl}/kite-data/players-leaderboard`);
    }

    // get player records by id
    getLatestDataByKitePlayerId(playerId: string): Observable<any> {
        return this.httpClient.get<any>
        (`${environment.apiBaseUrl}/kite-data/latest?include=current_week/${playerId}`);
    }

    // get total data records
    getLatestDataForAllPlayers(): Observable<TotalKiteData> {
        const url = `${environment.apiBaseUrl}/kite-data/latest?include=current_week`;
        return this.httpClient.get<TotalKiteData>(url);
    }

    // get player Id by userid
    getKitePlayerByUser(userId: string): Observable<any> {
        return this.httpClient.get<any>
        (`${environment.apiBaseUrl}/kite-players/users/${userId}`);
    }


}
