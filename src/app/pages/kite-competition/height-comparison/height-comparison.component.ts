// import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
// import { KiteApiService } from '../kite/kite-api.service';
// import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

// @Component({
//   selector: 'ngx-height-comparison',
//   templateUrl: './height-comparison.component.html',
//   styleUrls: ['./height-comparison.component.scss']
// })
// export class HeightComparisonComponent implements OnInit {
//   everestHeight: number = 8848;
//   kiteHeight: number = 0; // Start from 0 for animation
//   displayedHeight: number = 0;
//   accumulatedHeight: string = '0 m';

//   constructor(private kiteApiService: KiteApiService, private el: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {
//     this.kiteApiService.getLatestDataForAllPlayers().subscribe(
//       (data: TotalKiteData) => {
//         console.log('Fetched latest data:', data);  // Debugging log
//         if (data && data.total_height) {
//           this.startAnimations(data.total_height);
//         } else {
//           this.accumulatedHeight = '-';
//         }
//       },
//       (error) => {
//         console.error('Error fetching total height:', error);
//         this.accumulatedHeight = 'Error loading data';
//       }
//     );
//   }

//   startAnimations(targetHeight: number) {
//     const duration = 3000; // Duration in milliseconds
//     const startTime = Date.now();
//     const startHeight = this.displayedHeight;

//     // Start number rolling animation
//     this.animateHeight(targetHeight, duration, startTime, startHeight);
//   }

//   animateHeight(targetHeight: number, duration: number, startTime: number, startHeight: number) {
//     const increment = 10; // Increment value for rolling animation
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

//   updateProgressBarAndKite(newHeight: number) {
//     const progressBar = this.el.nativeElement.querySelector('.progress');
//     const kiteImage = this.el.nativeElement.querySelector('.kite-image');
//     const percentage = this.calculateHeightPercentage();

//     this.renderer.setStyle(progressBar, 'height', `${percentage}%`);
//     this.renderer.setStyle(kiteImage, 'bottom', `${percentage}%`);
//   }

//   calculateHeightPercentage(): number {
//     const percentage = (this.kiteHeight / this.everestHeight) * 100;
//     return Math.min(percentage, 100);
//   }
// }


import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { KiteApiService } from '../kite/kite-api.service';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
    selector: 'ngx-height-comparison',
    templateUrl: './height-comparison.component.html',
    styleUrls: ['./height-comparison.component.scss'],
})
export class HeightComparisonComponent implements OnInit {
    everestHeight: number = 8848;
    kiteHeight: number = 0; // Start from 0 for animation
    displayedHeight: number = 0;
    accumulatedHeight: string = '0 m';

    constructor(private kiteApiService: KiteApiService, private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.kiteApiService.getLatestDataForAllPlayers().subscribe(
            (data: TotalKiteData) => {
                if (data && data.total_height) {
                    this.startAnimations(data.total_height);
                } else {
                    this.accumulatedHeight = '-';
                }
            },
            (error) => {
                this.accumulatedHeight = 'Error loading data';
            }
        );
    }

    startAnimations(targetHeight: number) {
        const duration = 3000; // Duration in milliseconds
        const startTime = Date.now();
        const startHeight = this.displayedHeight;

        // Start the combined animations
        this.animateHeight(targetHeight, duration, startTime, startHeight);
    }

    animateHeight(targetHeight: number, duration: number, startTime: number, startHeight: number) {
        const increment = 100; // Increment value for rolling animation
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const newHeight = Math.floor(startHeight + progress * (targetHeight - startHeight));
            this.displayedHeight = Math.ceil(newHeight / increment) * increment; // Round up to nearest increment
            this.accumulatedHeight = `${this.displayedHeight} m`;

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

    updateProgressBarAndKite(newHeight: number) {
        const progressBar = this.el.nativeElement.querySelector('.progress');
        const kiteImage = this.el.nativeElement.querySelector('.kite-image');
        const percentage = this.calculateHeightPercentage(newHeight);

        this.renderer.setStyle(progressBar, 'height', `${percentage}%`);
        this.renderer.setStyle(kiteImage, 'bottom', `${percentage}%`);
    }

    calculateHeightPercentage(newHeight: number): number {
        const percentage = (newHeight / this.everestHeight) * 100;
        return Math.min(percentage, 100);
    }
}
