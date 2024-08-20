import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite-dashboard.component.html',
})
export class KiteDashboardComponent implements OnInit {
    latestData: TotalKiteData | null = null;
    playerId: string | null = null;
    showgraph: boolean = false;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
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
    }

    private updateViewBasedOnRoute(): void {
        const currentUrl = this.router.url;
        this.showgraph = currentUrl === '/kite/player/all';
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
        const url = `${environment.apiBaseUrl}/kite-data/latest?include=current_week`;
        return this.http.get<TotalKiteData>(url);
    }

    fetchDataForPlayer(playerId: string): Observable<TotalKiteData> {
        const url = `${environment.apiBaseUrl}/kite-data/latest/${playerId}?include=current_week`;
        return this.http.get<TotalKiteData>(url);
    }

    renderData(data: TotalKiteData): void {
        this.latestData = data;

    }
}





