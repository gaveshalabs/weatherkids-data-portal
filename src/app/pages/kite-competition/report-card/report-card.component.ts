import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TotalKiteData } from '../../../@components/leaderboard/leaderboard.interface';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ngx-reportcard',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnChanges {
    @Input() data: TotalKiteData | null = null;
    selected: string = 'all time report';  // Default to 'week report'

    reportData: any = {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['selected']) {
            this.updateReportData();
        }
    }

    updateReportData(): void {
        if (this.data) {
            if (this.selected === 'week report') {
                this.reportData = this.roundValues(this.data.current_week);
            } else if (this.selected === 'all time report') {
                this.reportData = this.roundValues(this.data.all_time);
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
                min_height: data.min_height ? Math.round(data.min_height) : undefined,  // Handle optional values
            };
        }
        return {};
    }

    onSelectionChange(event: any): void {
        this.selected = event.value;
        this.updateReportData(); // Update report data on selection change
    }

    @ViewChild(MatTooltip) tooltip: MatTooltip;

    showTooltip(event: MouseEvent) {
        this.tooltip.show();
    }
}
