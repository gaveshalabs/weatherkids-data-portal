import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SharedDataService {
    private playersSource = new BehaviorSubject<any[]>([]);
    players$ = this.playersSource.asObservable();

    setPlayers(players: any[]) {
        this.playersSource.next(players);
    }
}
