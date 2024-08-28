import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SharedDataService } from '../../../services/shared-data.service';
import { Player } from '../../../@components/leaderboard/leaderboard.interface';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite.component.html',
    styleUrls: ['./kite.component.scss'],
})
export class KiteComponent implements OnInit {
    isMobile: boolean = false;
    isPlayerView: boolean = false;
    @Input() combinedPlayers: Player[] = [];

    constructor(
        private sharedDataService: SharedDataService,
        private router: Router,
        private breakpointObserver: BreakpointObserver
    ) {
        // Listen for route changes and update view accordingly
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateViewBasedOnRoute();
            }
        });
    }

    ngOnInit(): void {

        this.sharedDataService.players$.subscribe(players => {
            this.combinedPlayers = players;
            console.log('Received players in kiteComponent:', this.combinedPlayers);
        });

        // Detect if the view is on mobile devices (below 768px)
        this.breakpointObserver.observe(['(max-width: 767px)'])
            .subscribe(result => {
                this.isMobile = result.matches;
                this.updateViewBasedOnRoute(); // Update view based on current route and device type
            });
    }

    private updateViewBasedOnRoute(): void {
        const currentUrl = this.router.url;

        if (this.isMobile) {
            if (currentUrl === '/kite/player/all') {
                this.isPlayerView = false; // Show leaderboard and header on /kite/player/all
            } else if (currentUrl.startsWith('/kite/player/')) {
                this.isPlayerView = true; // Show player view on specific player routes
            } else {
                this.isPlayerView = false; // Default case for other mobile routes
            }
        } else {
            this.isPlayerView = false; // Always reset for non-mobile views
        }
    }

    goBack(): void {
        this.router.navigate(['/kite/player/all']); // Navigate back to the player list
    }
}
