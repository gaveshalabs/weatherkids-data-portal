import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite.component.html',
    styleUrls: ['./kite.component.scss'],
})
export class KiteComponent implements OnInit {
    isMobile: boolean = false;
    isPlayerView: boolean = false;
    showBanner: boolean = false;
    latestData: TotalKiteData | null = null;
    playerId: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private breakpointObserver: BreakpointObserver
    ) {

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateViewBasedOnRoute();
            }
        });
    }

    ngOnInit(): void {

        // Detect if the view is on mobile devices (below 768px)
        this.breakpointObserver.observe([
            '(max-width: 767px)', // Mobile devices with width below 768px
        ]).subscribe(result => {
            this.isMobile = result.matches;
            this.updateViewBasedOnRoute();
        });

        // Listen for route changes to update the view
        this.router.events.subscribe(() => {
            this.updateViewBasedOnRoute();
        });

    }

    private updateViewBasedOnRoute(): void {
        const currentUrl = this.router.url;
        this.showBanner = currentUrl === '/kite/player/all';
        if (this.isMobile) {
            if (currentUrl === '/kite/player/all') {
                this.isPlayerView = false; // Show leaderboard and header
            } else if (currentUrl.startsWith('/kite/player/')) {
                this.isPlayerView = true; // Hide everything else, show "This is player view" message
            } else {
                this.isPlayerView = false; // Default to showing everything for other routes
            }
        } else {
            this.isPlayerView = false; // Reset for non-mobile views
        }
    }

    goBack(): void {
        this.router.navigate(['/kite/player/all']);
    }
}


