import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TotalKiteData } from '../leaderboard.interface';

@Component({
    selector: 'ngx-myrecords',
    styleUrls: ['./my-records.component.scss'],
    templateUrl: './my-records.component.html',
})
export class MyRecordsComponent {
    @Input() data: TotalKiteData | null = null;
}
