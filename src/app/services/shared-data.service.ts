import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../@components/leaderboard/leaderboard.interface';

@Injectable({
    providedIn: 'root',
})

export class SharedDataService {
    private playersSource = new BehaviorSubject<Player[]>([]);
    players$ = this.playersSource.asObservable();

    setPlayers(players: Player[]) {
        this.playersSource.next(players);
    }
}
