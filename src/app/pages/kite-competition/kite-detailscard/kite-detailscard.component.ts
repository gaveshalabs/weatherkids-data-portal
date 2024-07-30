import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
    selector: 'ngx-detailscard',
    styleUrls: ['./kite-detailscard.component.scss'],
    templateUrl: './kite-detailscard.component.html',
})
export class kitedetailsComponent implements OnInit, OnChanges {
    @Input() data: any;

    maxHeight: number;
    minHeight: number;
    totalAttempts: number;
    totalFlyingMins: number;
    totalHeight: number;

    constructor() {}

    ngOnInit(): void {
    // Fetch initial data if necessary or wait for data from parent component
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.updateCurrentWeekData(changes['data'].currentValue);
        }
    }

    updateCurrentWeekData(data: any): void {
        if (data && data.current_week) {
            this.maxHeight = Math.round(data.current_week.max_height);
            this.minHeight = Math.round(data.current_week.min_height);
            this.totalAttempts = Math.round(data.current_week.total_attempts);
            this.totalFlyingMins = Math.round(data.current_week.total_flying_mins);
            this.totalHeight = Math.round(data.current_week.total_height);
        } else {
            // Handle invalid data structure or missing data
            this.maxHeight = null;
            this.minHeight = null;
            this.totalAttempts = null;
            this.totalFlyingMins = null;
            this.totalHeight = null;
        }
    }
}
