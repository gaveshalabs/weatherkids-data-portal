import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-top-players',
    templateUrl: './top-players.component.html',
    styleUrls: ['./top-players.component.scss'],
})
export class TopPlayersComponent {

    @Input() topPlayer: any;

}
