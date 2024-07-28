import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
    selector: 'ngx-airtimerecord',
    styleUrls: ['./airtime-record.component.scss'],
    templateUrl: './airtime-record.component.html',
})
export class AirtimeRecordComponent implements OnInit, OnChanges {
    @Input() data: TotalKiteData | null = null;
    totalFlyingTime: string = '0 mins';
    private actualFlyingTime: number = 0;

    ngOnInit() {
        this.updateFlyingTime();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && changes['data'].currentValue) {
            this.updateFlyingTime();
        }
    }

    private updateFlyingTime(): void {
        if (this.data && this.data.all_time.total_flying_mins != null) {
            this.actualFlyingTime = Math.round(this.data.all_time.total_flying_mins);
            this.animateFlyingTime();
        } else {
            this.totalFlyingTime = '-';
        }
    }

    private animateFlyingTime(): void {
        const duration = 2000;
        const interval = 50;
        const steps = duration / interval;
        const increment = Math.ceil(this.actualFlyingTime / steps);
        let currentFlyingTime = 0;

        const timer = setInterval(() => {
            currentFlyingTime += increment;
            if (currentFlyingTime >= this.actualFlyingTime) {
                clearInterval(timer);
                this.totalFlyingTime = `${this.actualFlyingTime} mins`;
            } else {
                this.totalFlyingTime = `${currentFlyingTime} mins`;
            }
        }, interval);
    }
}
