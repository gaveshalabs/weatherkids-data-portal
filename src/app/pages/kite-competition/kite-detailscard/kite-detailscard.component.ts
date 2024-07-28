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
            Math.round(this.maxHeight = data.current_week.max_height);
            Math.round(this.minHeight = data.current_week.min_height);
            Math.round(this.totalAttempts = data.current_week.total_attempts);
            Math.round(this.totalFlyingMins = data.current_week.total_flying_mins);
            Math.round(this.totalHeight = data.current_week.total_height);
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
