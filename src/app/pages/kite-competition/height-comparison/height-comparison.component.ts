import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'ngx-height-comparison',
    templateUrl: './height-comparison.component.html',
    styleUrls: ['./height-comparison.component.scss'],
})
export class HeightComparisonComponent implements OnInit, OnChanges, AfterViewChecked {
    slidesPerView: number = 1;
    @Input() data: TotalKiteData | null = null;
    lotustowerheight: number = 351.5;
    piduruthalagalaheight: number = 2524;
    everestHeight: number = 8849;
    kiteHeight: number = 0; // Start from 0 for animation
    displayedHeight: number = 0;
    accumulatedHeight: string = '0 m';
    accumulatedHeightNumber: number = 0; // To store numeric height
    isAllPlayersUrl: boolean = false; // Default value
    private needsAnimationUpdate: boolean = false; // Flag to trigger animation update

    constructor(private router: Router) {}

    ngOnInit() {
        this.checkUrl(); // Initial check on component load

        // Subscribe to router events to detect URL changes
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.checkUrl(); // Update isAllPlayersUrl when the URL changes
        });
        this.updateHeight();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && changes['data'].currentValue) {
            this.updateHeight();
        }
    }

    ngAfterViewChecked() {
        if (this.needsAnimationUpdate) {
            this.updateAllProgressBarsAndKites(this.displayedHeight);
            this.needsAnimationUpdate = false;
        }
    }

    private checkUrl(): void {
        const currentPath = this.router.url;
        this.isAllPlayersUrl = currentPath === '/kite/player/all';
    }

    private updateHeight(): void {
        if (this.data && this.data.stat.all_time.total_height != null) {
            this.startAnimations(Math.round(this.data.stat.all_time.total_height));
        } else {
            this.accumulatedHeight = '-';
        }
    }

    private startAnimations(targetHeight: number): void {
        const duration = 2000; // Duration in milliseconds
        const startTime = Date.now();
        const startHeight = this.displayedHeight;

        const animate = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            this.displayedHeight = Math.round(startHeight + (targetHeight - startHeight) * progress);
            this.accumulatedHeight = `${this.displayedHeight} m`;
            this.accumulatedHeightNumber = this.displayedHeight;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.kiteHeight = targetHeight;
            }

            this.needsAnimationUpdate = true;
        };

        requestAnimationFrame(animate);
    }

    private updateAllProgressBarsAndKites(newHeight: number): void {
        this.updateProgressBarAndKite
        (newHeight, '.progress-lotus', '.kite-lotus', this.lotustowerheight);
        this.updateProgressBarAndKite
        (newHeight, '.progress-piduruthalagala', '.kite-piduruthalagala', this.piduruthalagalaheight);
        this.updateProgressBarAndKite
        (newHeight, '.progress-everest', '.kite-everest', this.everestHeight);
    }

    private updateProgressBarAndKite
    (newHeight: number, progressBarSelector: string, kiteSelector: string, referenceHeight: number): void {
        const progressBar = document.querySelector(progressBarSelector);
        const kiteImage = document.querySelector(kiteSelector);

        if (progressBar && kiteImage) {
            const percentage = this.calculateHeightPercentage(newHeight, referenceHeight);
            (progressBar as HTMLElement).style.height = `${percentage}%`;
            (kiteImage as HTMLElement).style.bottom = `${percentage}%`;
        }
    }

    private calculateHeightPercentage(newHeight: number, referenceHeight: number): number {
        const percentage = (newHeight / referenceHeight) * 100;
        return Math.min(percentage, 100);
    }
}
