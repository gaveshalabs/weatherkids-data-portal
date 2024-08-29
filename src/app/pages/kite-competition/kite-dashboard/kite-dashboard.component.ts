import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { environment } from '../../../../environments/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LoaderService } from '../../../@theme/components/loader/loader.service';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite-dashboard.component.html',
    styleUrls: ['./kite-dashboard.component.scss'],
})
export class KiteDashboardComponent implements OnInit, OnDestroy {
    latestData: TotalKiteData | null = null;
    playerId: string | null = null;
    showgraph: boolean = false;
    showBanner: boolean = false;
    isMobileView: boolean = false;
    hideOnMobile: boolean = false;


    private subscriptions: Subscription = new Subscription();

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private breakpointObserver: BreakpointObserver,
        private loaderService: LoaderService
    ) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.route.params
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    switchMap(params => {
                        this.playerId = params['id'];
                        this.updateViewBasedOnRoute();
                        this.loaderService.show();

                        return this.fetchData();
                    })
                )
                .subscribe(
                    data => {
                        this.renderData(data);
                        // Hide the loader after data has been fetched
                        this.loaderService.hide();
                    },
                    error => {
                        console.error('Error fetching data:', error);
                        // Hide the loader on error as well
                        this.loaderService.hide();
                    }
                )
        );
        //         .subscribe(data => this.renderData(data))
        // );

        this.subscriptions.add(
            this.breakpointObserver.observe([Breakpoints.Handset])
                .subscribe(result => {
                    this.isMobileView = result.matches;
                    this.checkRoute();
                })
        );

        this.subscriptions.add(
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.updateViewBasedOnRoute();
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    checkRoute(): void {
        const currentUrl = this.router.url;
        this.hideOnMobile = currentUrl.includes('/kite/player/all') && this.isMobileView;
    }

    fetchData(): Observable<TotalKiteData> {
        if (this.playerId && this.playerId !== 'all') {
            return this.fetchDataForPlayer(this.playerId);
        } else if (this.playerId === 'all') {
            return this.fetchLatestData();
        } else {
            return this.fetchLatestData();
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
        if (currentUrl === '/kite/player/all') {
            this.showgraph = true;
            this.showBanner = true;

        } else if (this.playerId && currentUrl === `/kite/player/${this.playerId}`) {
            this.showgraph = false;
            this.showBanner = false;

        } else {
            this.showgraph = false;
            this.showBanner = false;

        }
    }
}
