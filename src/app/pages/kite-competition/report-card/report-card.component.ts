import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ngx-reportcard',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnChanges, OnDestroy {

    @Input() data: TotalKiteData | null = null;
    selected: string;
    reportData: any = {};
    showPlayerCount: boolean = false;

    private routerSubscription: Subscription;
    constructor(private route: ActivatedRoute, private router: Router) {
        this.setDefaultSelectionBasedOnRoute();

        // Subscribe to router events to dynamically update the selected report type
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.setDefaultSelectionBasedOnRoute();
                this.updateReportData();  // Ensure report data is updated when route changes
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['selected']) {
            this.updateReportData();
        }
    }
    ngOnDestroy(): void {
        // Unsubscribe from router events when the component is destroyed to prevent memory leaks
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

    updateReportData(): void {
        if (this.data) {
            if (this.selected === 'week report') {
                this.reportData = this.roundValues(this.data.stat.current_week);
            } else if (this.selected === 'all time report') {
                this.reportData = this.roundValues(this.data.stat.all_time);
            }
        }
    }

    roundValues(data: any): any {
        if (data) {
            return {
                ...data,
                total_height: Math.round(data.total_height),
                total_attempts: Math.round(data.total_attempts),
                total_flying_mins: Math.round(data.total_flying_mins),
                max_height: Math.round(data.max_height),
                player_count: Math.round(data.player_count),

            };
        }
        return {};
    }

    onSelectionChange(event: any): void {
        this.selected = event.value;
        this.updateReportData();
    }

    @ViewChild(MatTooltip) tooltip: MatTooltip;

    showTooltip(event: MouseEvent) {
        this.tooltip.show();
    }

    setDefaultSelectionBasedOnRoute(): void {
        const currentUrl = this.router.url;

        if (currentUrl === '/kite/player/all') {
            this.selected = 'all time report';
            this.showPlayerCount = true;  // Show player count tile
        } else if (currentUrl.startsWith('/kite/player/')) {
            this.selected = 'week report';
            this.showPlayerCount = false; // Hide player count tile
        } else {
            this.selected = 'week report';
            this.showPlayerCount = false; // Hide player count tile for any other route
        }
    }
}
