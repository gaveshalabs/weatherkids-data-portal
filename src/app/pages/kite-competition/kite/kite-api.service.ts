import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AgeGroupData, AttemptData, DistrictData, KitePlayer, PlayerData, TotalKiteData,
} from '../../../@components/leaderboard/leaderboard.interface';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Attempt } from '../../../@components/leaderboard/leaderboard.interface';

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
        (`${environment.apiBaseUrl}/kite-data/latest/player?include=current_week/${playerId}`);
    }

    // get total data records
    getLatestDataForAllPlayers(): Observable<TotalKiteData> {
        const url = `${environment.apiBaseUrl}/kite-data/latest/player?include=current_week`;
        return this.httpClient.get<TotalKiteData>(url);
    }

    // get player records by userid
    getLatestUserData(userId: string): Observable<TotalKiteData> {
        return this.httpClient.get<TotalKiteData>
        (`${environment.apiBaseUrl}/kite-data/latest/user/${userId}?include=current_week`);
    }


    // Get Age Group Data
    getAgeGroupData(): Observable<AgeGroupData[]> {
        return this.httpClient.get<AgeGroupData[]>(`${environment.apiBaseUrl}/kite-players/age-group`);

    }

    getKitePlayerByUserId(userId: string): Observable<KitePlayer> {
        return this.httpClient.get<KitePlayer>(`${environment.apiBaseUrl}/kite-players/users/${userId}`);
    }

    // Get Nearest District Data
    getNearestDistrictData(): Observable<DistrictData[]> {
        return this.httpClient.get<DistrictData[]>(`${environment.apiBaseUrl}/kite-players/nearest-district`);

    }

    getPlayerData(playerId: string): Observable<PlayerData> {
        return this.httpClient.get<PlayerData>
        (`${environment.apiBaseUrl}/kite-players/${playerId}?sortByHeight=asc&sortByAttempt=desc`);
    }


    getAttemptData(playerId: string, attemptTimestamp: string): Observable<AttemptData> {
        return this.httpClient.get<AttemptData>
        (`${environment.apiBaseUrl}/kite-players/${playerId}/attempts/${attemptTimestamp}`);
    }

}
