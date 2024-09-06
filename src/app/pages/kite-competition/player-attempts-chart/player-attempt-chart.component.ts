import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Attempt, PlayerData } from '../../../@components/leaderboard/leaderboard.interface';
import { KiteApiService } from '../kite/kite-api.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngx-playerattemptchart',
    styleUrls: ['./player-attempt-chart.component.scss'],
    templateUrl: './player-attempt-chart.component.html',
})
export class PlayerAttemptChartComponent implements OnInit, OnDestroy {
    playerData: PlayerData | null = null;
    attemptDataCache: { [key: string]: any } = {};
    private destroy$ = new Subject<void>();
    @ViewChildren('lineChart') lineCharts: QueryList<any>;

    constructor(private kiteApiService: KiteApiService, private route: ActivatedRoute) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(params => {
                const playerId = params.get('id');
                if (playerId) {
                    this.fetchPlayerData(playerId);
                }
            });
    }

    fetchPlayerData(playerId: string): void {
        // Fetch data only if playerId is different from the current player
        if (!this.playerData || this.playerData.kitePlayer._id !== playerId) {
            this.kiteApiService.getPlayerData(playerId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data: PlayerData) => {
                        if (data && data.attempts) {
                            data.attempts = data.attempts.map((attempt: Attempt) => ({
                                ...attempt,
                                height: Math.round(attempt.height),
                            }));
                        }
                        this.playerData = data;
                    },
                    (error) => {
                        console.error('Error fetching player data', error);
                    }
                );
        }
    }

    fetchAttemptData(playerId: string, attemptTimestamp: string, panelIndex: number): void {
        const cacheKey = `${playerId}-${attemptTimestamp}`;

        // Check if the data is already cached
        if (this.attemptDataCache[cacheKey]) {
            this.renderChart(panelIndex, this.attemptDataCache[cacheKey]);
        } else {
            this.kiteApiService.getAttemptData(playerId, attemptTimestamp)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data: { data: { timestamp: string; height: number }[] }) => {
                        const chartData = {
                            labels: data.data.map(d => new Date(d.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })),
                            datasets: [{
                                label: 'Height',
                                backgroundColor: 'rgb(102, 187, 106)',
                                data: data.data.map(d => d.height),
                                fill: false,
                                borderColor: 'rgb(102, 187, 106)',
                                tension: 0.1,
                                pointRadius: 0,
                            }],
                        };

                        // Cache the data
                        this.attemptDataCache[cacheKey] = chartData;

                        // Render the chart
                        this.renderChart(panelIndex, chartData);
                    },
                    (error) => {
                        console.error('Error fetching attempt data', error);
                    }
                );
        }
    }

    renderChart(panelIndex: number, chartData: any): void {
        const canvasElement = this.lineCharts.toArray()[panelIndex].nativeElement;
        const ctx = canvasElement.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }

    onPanelOpened(panelIndex: number): void {
        const attempt = this.playerData?.attempts[panelIndex];
        if (attempt && this.playerData) {
            const playerId = this.playerData.kitePlayer._id;
            this.fetchAttemptData(playerId, attempt.attempt_timestamp, panelIndex);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

