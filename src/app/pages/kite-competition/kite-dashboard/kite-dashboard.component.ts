import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { environment } from '../../../../environments/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite-dashboard.component.html',
    styleUrls: ['./kite-dashboard.component.scss'],
})
export class KiteDashboardComponent implements OnInit {
    latestData: TotalKiteData | null = null;
    playerId: string | null = null;
    showgraph: boolean = false;
    showBanner: boolean = false;
    isMobileView: boolean = false;
    hideOnMobile: boolean = false;

    constructor(
        private http: HttpClient,
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
        // Subscribe to route parameters and determine the playerId
        this.route.params.subscribe(params => {
            this.playerId = params['id'];
            this.fetchData();
            this.updateViewBasedOnRoute();  // Update view after fetching data
        });

        // Detect screen size
        this.breakpointObserver.observe([Breakpoints.Handset])
            .subscribe(result => {
                this.isMobileView = result.matches;
                this.checkRoute();
            });

        // Listen for route changes
        this.router.events.subscribe(() => {
            this.checkRoute();
        });


        // Listen for route changes to update the view
        this.router.events.subscribe(() => {
            this.updateViewBasedOnRoute();
        });

    }

    checkRoute(): void {
        const currentUrl = this.router.url;
        if (currentUrl.includes('/kite/player/all') && this.isMobileView) {
            this.hideOnMobile = true;
        } else {
            this.hideOnMobile = false;
        }
    }

    fetchData(): void {
        // Fetch data based on the presence of playerId
        if (this.playerId && this.playerId !== 'all') {
            this.fetchDataForPlayer(this.playerId).subscribe(data => this.renderData(data));
        } else {
            this.fetchLatestData().subscribe(data => this.renderData(data));
        }
    }

    fetchLatestData(): Observable<TotalKiteData> {
        const url = `${environment.apiBaseUrl}/kite-data/latest/player?include=current_week`;
        return this.http.get<TotalKiteData>(url);
    }

    fetchDataForPlayer(playerId: string): Observable<TotalKiteData> {
        const url = `${environment.apiBaseUrl}/kite-data/latest/player/${playerId}?include=current_week`;
        return this.http.get<TotalKiteData>(url);
    }


    renderData(data: TotalKiteData): void {
        this.latestData = data;

    }

    private updateViewBasedOnRoute(): void {
        const currentUrl = this.router.url;
        this.showgraph = currentUrl === '/kite/player/all';
        this.showBanner = currentUrl === '/kite/player/all';
    }
}





