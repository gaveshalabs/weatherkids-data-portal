// import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
// import { TotalKiteData } from '../../../../@components/leaderboard/leaderboard.interface';
// import { MatTooltip } from '@angular/material/tooltip';

// @Component({
//     selector: 'ngx-desktopplayerdatacard',
//     styleUrls: ['./desktop-player-data-card.component.scss'],
//     templateUrl: './desktop-player-data-card.component.html',
// })
// export class DesktopPlayerDataCardComponent implements OnInit, OnChanges {
//     @Input() data: TotalKiteData | null = null;
//     totalAttempts: string = '0';
//     totalFlyingtime: string = '0';
//     bestHeight: string = '0';
//     rank: string ='0';
//     name:string;
//     city:string;
//     img_url:string;

//     @ViewChild(MatTooltip) tooltip: MatTooltip;

//     ngOnInit() {
//         this.updateAttempts();
//         this.updateFlyingtime();
//         this.updateBestHeight();
//         this.updateRank();
//         this.updateName();
//         this.updateCity();
//         this.updateImageUrl();
//     }

//     ngOnChanges(changes: SimpleChanges): void {
//         if (changes['data'] && changes['data'].currentValue) {
//             this.updateAttempts();
//             this.updateFlyingtime();
//             this.updateBestHeight();
//             this.updateRank();
//             this.updateName();
//             this.updateCity();
//             this.updateImageUrl();
//         }
//     }

//     private updateAttempts(): void {
//         if (this.data && this.data.stat.all_time.total_attempts != null) {
//             const roundedAttempts = Math.round(this.data.stat.all_time.total_attempts);
//             this.totalAttempts = `${roundedAttempts}`;
//         } else {
//             this.totalAttempts = '-';
//         }
//     }

//     private updateFlyingtime(): void {
//         if (this.data && this.data.stat.all_time.total_flying_mins != null) {
//             const roundedFlyingtime = Math.round(this.data.stat.all_time.total_flying_mins);
//             this.totalFlyingtime = `${roundedFlyingtime}`;
//         } else {
//             this.totalFlyingtime = '-';
//         }
//     }

//     private updateBestHeight(): void {
//         if (this.data && this.data.stat.all_time.max_height != null) {
//             const roundedHeight = Math.round(this.data.stat.all_time.max_height);
//             this.bestHeight = `${roundedHeight}`;
//         } else {
//             this.bestHeight = '-';
//         }
//     }

//     private updateRank(): void {
//         if (this.data && this.data.player.rank != null) {
//             const roundedRank = Math.round(this.data.player.rank);
//             this.rank = `${roundedRank}`;
//         } else {
//             this.rank = '-';
//         }
//     }

//     private updateName(): void {
//         if (this.data && this.data.player.name != null) {
//             this.name = this.data.player.name;
//         } else {
//             this.name = '-';
//         }
//     }

//     private updateCity(): void {
//         if (this.data && this.data.player.city != null) {
//             this.city = this.data.player.city;
//         } else {
//             this.city = '-';
//         }
//     }

//     private updateImageUrl(): void {
//         if (this.data && this.data.player.img_url != null) {
//             this.img_url = this.data.player.img_url;
//         } else {
//             this.img_url = '-';
//         }
//     }

//     getPlayerImageUrl(imgtopUrl: string): string {
//         if (!imgtopUrl) {
//             return 'assets/default-image-url.jpg';
//         }

//         if (imgtopUrl.startsWith('assets/avatars/Avatar_Icons/')) {
//             return imgtopUrl;
//         }

//         const filename = imgtopUrl.substring(imgtopUrl.lastIndexOf('/') + 1);
//         return `assets/avatars/Avatar_Icons/${filename}`;
//     }

//     showTooltip(event: MouseEvent) {
//         this.tooltip.show();
//     }
// }




import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TotalKiteData } from '../../../../@components/leaderboard/leaderboard.interface';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ngx-desktopplayerdatacard',
    styleUrls: ['./desktop-player-data-card.component.scss'],
    templateUrl: './desktop-player-data-card.component.html',
})
export class DesktopPlayerDataCardComponent implements OnInit, OnChanges {
    @Input() data: TotalKiteData | null = null;
    totalAttempts: string = '0';
    totalFlyingtime: string = '0';
    bestHeight: string = '0';
    rank: string = '0';
    name: string = '-';
    city: string = '-';
    img_url: string = '-';

    @ViewChild(MatTooltip) tooltip: MatTooltip;

    ngOnInit() {
        this.updateAllValues();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && changes['data'].currentValue) {
            this.updateAllValues();
        }
    }

    private updateAllValues(): void {
        this.updateAttempts();
        this.updateFlyingtime();
        this.updateBestHeight();
        this.updateRank();
        this.updateName();
        this.updateCity();
        this.updateImageUrl();
    }

    private animateValue(
        currentValue: number,
        targetValue: number,
        duration: number,
        updateCallback: (value: number) => void
    ): void {
        const startTime = Date.now();
        const startValue = currentValue;

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const newValue = Math.floor(startValue + progress * (targetValue - startValue));

            updateCallback(newValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    private parseNumber(value: string | number): number {
        const parsedValue = parseInt(value as string, 10);
        return isNaN(parsedValue) ? 0 : parsedValue;
    }

    private updateAttempts(): void {
        if (this.data && this.data.stat.all_time.total_attempts != null) {
            const targetAttempts = Math.round(this.data.stat.all_time.total_attempts);
            const currentAttempts = this.parseNumber(this.totalAttempts);
            this.animateValue(currentAttempts, targetAttempts, 2000, (value) => {
                this.totalAttempts = `${value}`;
            });
        } else {
            this.totalAttempts = '-';
        }
    }

    private updateFlyingtime(): void {
        if (this.data && this.data.stat.all_time.total_flying_mins != null) {
            const targetFlyingtime = Math.round(this.data.stat.all_time.total_flying_mins);
            const currentFlyingtime = this.parseNumber(this.totalFlyingtime);
            this.animateValue(currentFlyingtime, targetFlyingtime, 2000, (value) => {
                this.totalFlyingtime = `${value}`;
            });
        } else {
            this.totalFlyingtime = '-';
        }
    }

    private updateBestHeight(): void {
        if (this.data && this.data.stat.all_time.max_height != null) {
            const targetHeight = Math.round(this.data.stat.all_time.max_height);
            const currentHeight = this.parseNumber(this.bestHeight);
            this.animateValue(currentHeight, targetHeight, 2000, (value) => {
                this.bestHeight = `${value}`;
            });
        } else {
            this.bestHeight = '-';
        }
    }

    private updateRank(): void {
        if (this.data && this.data.player.rank != null) {
            const targetRank = Math.round(this.data.player.rank);
            const currentRank = this.parseNumber(this.rank);
            this.animateValue(currentRank, targetRank, 2000, (value) => {
                this.rank = `${value}`;
            });
        } else {
            this.rank = '-';
        }
    }

    private updateName(): void {
        if (this.data && this.data.player.name != null) {
            this.name = this.data.player.name;
        } else {
            this.name = '-';
        }
    }

    private updateCity(): void {
        if (this.data && this.data.player.city != null) {
            this.city = this.data.player.city;
        } else {
            this.city = '-';
        }
    }

    private updateImageUrl(): void {
        if (this.data && this.data.player.img_url != null) {
            this.img_url = this.data.player.img_url;
        } else {
            this.img_url = '-';
        }
    }

    getPlayerImageUrl(imgtopUrl: string): string {
        if (!imgtopUrl) {
            return 'assets/default-image-url.jpg';
        }

        if (imgtopUrl.startsWith('assets/avatars/Avatar_Icons/')) {
            return imgtopUrl;
        }

        const filename = imgtopUrl.substring(imgtopUrl.lastIndexOf('/') + 1);
        return `assets/avatars/Avatar_Icons/${filename}`;
    }

    showTooltip(event: MouseEvent) {
        this.tooltip.show();
    }
}
