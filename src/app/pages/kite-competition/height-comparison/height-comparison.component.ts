// import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
// import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

// @Component({
//   selector: 'ngx-height-comparison',
//   templateUrl: './height-comparison.component.html',
//   styleUrls: ['./height-comparison.component.scss'],
// })
// export class HeightComparisonComponent implements OnInit, OnChanges {
//   @Input() data: TotalKiteData | null = null;
//   everestHeight: number = 8848;
//   kiteHeight: number = 0; // Start from 0 for animation
//   displayedHeight: number = 0;
//   accumulatedHeight: string = '0 m';

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {
//     this.updateHeight();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['data'] && changes['data'].currentValue) {
//       this.updateHeight();
//     }
//   }

//   private updateHeight(): void {
//     if (this.data && this.data.all_time.total_height != null) {
//       this.startAnimations(this.data.all_time.total_height);
//     } else {
//       this.accumulatedHeight = '-';
//     }
//   }

//   private startAnimations(targetHeight: number): void {
//     const duration = 3000; // Duration in milliseconds
//     const startTime = Date.now();
//     const startHeight = this.displayedHeight;

//     // Start the combined animations
//     this.animateHeight(targetHeight, duration, startTime, startHeight);
//   }

//   private animateHeight(targetHeight: number, duration: number, startTime: number, startHeight: number): void {
//     const increment = 5; // Increment value for rolling animation
//     const animate = () => {
//       const currentTime = Date.now();
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const newHeight = Math.floor(startHeight + progress * (targetHeight - startHeight));
//       this.displayedHeight = Math.ceil(newHeight / increment) * increment; // Round up to nearest increment
//       this.accumulatedHeight = `${this.displayedHeight} m`;

//       // Update the progress bar height and kite image position
//       this.updateProgressBarAndKite(newHeight);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       } else {
//         this.kiteHeight = targetHeight;
//       }
//     };

//     requestAnimationFrame(animate);
//   }

//   private updateProgressBarAndKite(newHeight: number): void {
//     const progressBar = this.el.nativeElement.querySelector('.progress');
//     const kiteImage = this.el.nativeElement.querySelector('.kite-image');
//     const percentage = this.calculateHeightPercentage(newHeight);

//     this.renderer.setStyle(progressBar, 'height', `${percentage}%`);
//     this.renderer.setStyle(kiteImage, 'bottom', `${percentage}%`);
//   }

//   private calculateHeightPercentage(newHeight: number): number {
//     const percentage = (newHeight / this.everestHeight) * 100;
//     return Math.min(percentage, 100);
//   }
// }



import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
    selector: 'ngx-height-comparison',
    templateUrl: './height-comparison.component.html',
    styleUrls: ['./height-comparison.component.scss'],
})
export class HeightComparisonComponent implements OnInit, OnChanges {
    @Input() data: TotalKiteData | null = null;
    everestHeight: number =  351.5 ;
    kiteHeight: number = 0; // Start from 0 for animation
    displayedHeight: number = 0;
    accumulatedHeight: string = '0 m';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.updateHeight();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && changes['data'].currentValue) {
            this.updateHeight();
        }
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

        // Start the combined animations
        this.animateHeight(targetHeight, duration, startTime, startHeight);
    }

    private animateHeight(targetHeight: number, duration: number, startTime: number, startHeight: number): void {
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const newHeight = Math.floor(startHeight + progress * (targetHeight - startHeight));
            this.displayedHeight = newHeight;
            this.accumulatedHeight = `${newHeight} m`; // Show integer value

            // Update the progress bar height and kite image position
            this.updateProgressBarAndKite(newHeight);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.kiteHeight = targetHeight;
            }
        };

        requestAnimationFrame(animate);
    }

    private updateProgressBarAndKite(newHeight: number): void {
        const progressBar = this.el.nativeElement.querySelector('.progress');
        const kiteImage = this.el.nativeElement.querySelector('.kite-image');
        const percentage = this.calculateHeightPercentage(newHeight);

        this.renderer.setStyle(progressBar, 'height', `${percentage}%`);
        this.renderer.setStyle(kiteImage, 'bottom', `${percentage}%`);
    }

    private calculateHeightPercentage(newHeight: number): number {
        const percentage = (newHeight / this.everestHeight) * 100;
        return Math.min(percentage, 100);
    }
}
