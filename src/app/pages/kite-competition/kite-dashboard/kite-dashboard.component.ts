import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { kiteenvironment } from '../kite/kite-environments/environment';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite-dashboard.component.html',
})
export class KiteDashboardComponent implements OnInit {
    latestData: TotalKiteData | null = null;
    playerId: string | null = null;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
    // Subscribe to route parameters and determine the playerId
        this.route.params.subscribe(params => {
            this.playerId = params['id'];
            this.fetchData();
        });
    }

    fetchData(): void {
    // Fetch data based on the presence of playerId
        if (this.playerId) {
            this.fetchDataForPlayer(this.playerId).subscribe(data => this.renderData(data));
        } else {
            this.fetchLatestData().subscribe(data => this.renderData(data));
        }
    }

    fetchLatestData(): Observable<TotalKiteData> {
        const url = `${kiteenvironment.apiBaseUrl}/kite-data/latest?include=current_week`;
        return this.http.get<TotalKiteData>(url);
    }

    fetchDataForPlayer(playerId: string): Observable<TotalKiteData> {
        const url = `${kiteenvironment.apiBaseUrl}/kite-data/latest/${playerId}?include=current_week`;
        return this.http.get<TotalKiteData>(url);
    }

    renderData(data: TotalKiteData): void {
        this.latestData = data;
        // console.log('Fetched data:', data);
    }
}




