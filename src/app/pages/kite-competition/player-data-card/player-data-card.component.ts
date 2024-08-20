import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ngx-playerdatacard',
    styleUrls: ['./player-data-card.component.scss'],
    templateUrl: './player-data-card.component.html',
})
export class PlayerDataCardComponent implements OnInit, OnChanges {
    @ViewChild(MatTooltip) tooltip: MatTooltip;

    showTooltip(event: MouseEvent) {
        this.tooltip.show();
    }
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
