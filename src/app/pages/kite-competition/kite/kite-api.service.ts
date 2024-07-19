import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player, KiteData, TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
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


// get kite data by player ID
getLatestDataByKitePlayerId(kitePlayerId: string): Observable<any> {
  return this.httpClient.get<any>(`${kiteenvironment.apiBaseUrl}/kite-data/latest/${kitePlayerId}`);
}

  // Get current week's data
  getCurrentWeekData(): Observable<any> {
    return this.httpClient.get<any>(`${kiteenvironment.apiBaseUrl}/kite-data/latest`);
  }

//get total data to cards
getLatestDataForAllPlayers(): Observable<TotalKiteData> {
  return this.httpClient.get<TotalKiteData>(`${kiteenvironment.apiBaseUrl}/kite-data/latest`);
}

}
