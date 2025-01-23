import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SharedDataService {
    private playersSource = new BehaviorSubject<never[]>([]);
    players$ = this.playersSource.asObservable();

    setPlayers(players: never[]) {
        this.playersSource.next(players);
    }
}
