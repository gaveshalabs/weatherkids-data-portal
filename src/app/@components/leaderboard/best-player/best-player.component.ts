import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-best-player',
  templateUrl: './best-player.component.html',
  styleUrls: ['./best-player.component.scss'],
})
export class BestPlayerComponent {
    @Input() bestPlayer: any;
}
