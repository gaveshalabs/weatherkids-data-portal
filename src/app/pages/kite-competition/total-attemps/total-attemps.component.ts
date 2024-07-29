import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
    selector: 'ngx-totalattemps',
    styleUrls: ['./total-attemps.component.scss'],
    templateUrl: './total-attemps.component.html',
})
export class TotalAttempsComponent implements OnInit, OnChanges {
    @Input() data: TotalKiteData | null = null;
    totalAttempts: string = '0';
    displayedAttempts: number = 0;

    ngOnInit() {
        this.updateAttempts();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && changes['data'].currentValue) {
            this.updateAttempts();
        }
    }

    private updateAttempts(): void {
        if (this.data && this.data.all_time.total_attempts != null) {
            this.animateAttempts(this.data.all_time.total_attempts);
        } else {
            this.totalAttempts = '-';
        }
    }

    private animateAttempts(targetAttempts: number): void {
        const duration = 3000;
        const interval = 50;
        const steps = duration / interval;
        const increment = Math.ceil(targetAttempts / steps);
        let currentAttempts = 0;

        const timer = setInterval(() => {
            currentAttempts += increment;
            if (currentAttempts >= targetAttempts) {
                clearInterval(timer);
                this.totalAttempts = `${targetAttempts} +`;
            } else {
                this.totalAttempts = `${currentAttempts} +`;
            }
        }, interval);
    }
}
