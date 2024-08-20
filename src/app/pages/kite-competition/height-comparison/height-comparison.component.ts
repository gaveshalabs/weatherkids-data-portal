import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'ngx-height-comparison',
    templateUrl: './height-comparison.component.html',
    styleUrls: ['./height-comparison.component.scss'],
})
export class HeightComparisonComponent implements OnInit, OnChanges {
    slidesPerView: number = 1;
    @Input() data: TotalKiteData | null = null;
    lotustowerheight: number = 351.5;
    piduruthalagalaheight: number = 2524;
    everestHeight: number = 8849;
    kiteHeight: number = 0; // Start from 0 for animation
    displayedHeight: number = 0;
    accumulatedHeight: string = '0 m';
    isAllPlayersUrl: boolean = false; // Default value

    constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

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

    private checkUrl(): void {
        const currentPath = this.router.url;
        this.isAllPlayersUrl = currentPath === '/kite/player/all';
    }

    private updateHeight(): void {
        if (this.data && this.data.all_time.total_height != null) {
            this.startAnimations(Math.round(this.data.all_time.total_height));
        } else {
            this.accumulatedHeight = '-';
        }
    }

    private startAnimations(targetHeight: number): void {
        const duration = 2000; // Duration in milliseconds
        const startTime = Date.now();
        const startHeight = this.displayedHeight;

        this.animateHeight(targetHeight, duration, startTime, startHeight);
    }

    private animateHeight(targetHeight: number, duration: number, startTime: number, startHeight: number): void {
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const newHeight = Math.floor(startHeight + progress * (targetHeight - startHeight));

            this.displayedHeight = newHeight;
            this.accumulatedHeight = `${this.displayedHeight} m`;

            // Update progress bars and kite images for all cards
            this.updateAllProgressBarsAndKites(newHeight);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.kiteHeight = targetHeight;
            }
        };

        requestAnimationFrame(animate);
    }

    private updateAllProgressBarsAndKites(newHeight: number): void {
        // Update the first card (Lotus Tower)
        this.updateProgressBarAndKite(newHeight, '.progress-lotus', '.kite-lotus', this.lotustowerheight);

        // Update the second card (Piduruthalagala)
        this.updateProgressBarAndKite
        (newHeight, '.progress-piduruthalagala', '.kite-piduruthalagala', this.piduruthalagalaheight);

        // Update the third card (Everest)
        this.updateProgressBarAndKite(newHeight, '.progress-everest', '.kite-everest', this.everestHeight);
    }

    private updateProgressBarAndKite(
        newHeight: number, progressBarSelector: string, kiteSelector: string, referenceHeight: number
    ): void {
        const progressBar = this.el.nativeElement.querySelector(progressBarSelector);
        const kiteImage = this.el.nativeElement.querySelector(kiteSelector);

        const percentage = this.calculateHeightPercentage(newHeight, referenceHeight);

        this.renderer.setStyle(progressBar, 'height', `${percentage}%`);
        this.renderer.setStyle(kiteImage, 'bottom', `${percentage}%`);
    }

    private calculateHeightPercentage(newHeight: number, referenceHeight: number): number {
        const percentage = (newHeight / referenceHeight) * 100;
        return Math.min(percentage, 100);
    }
}




