import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TotalKiteData } from '../../../../@components/leaderboard/leaderboard.interface';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ngx-desktopplayerdatacard',
    styleUrls: ['./desktop-player-data-card.component.scss'],
    templateUrl: './desktop-player-data-card.component.html',
})
export class DesktopPlayerDataCardComponent {
    @ViewChild(MatTooltip) tooltip: MatTooltip;

    showTooltip(event: MouseEvent) {
        this.tooltip.show();
    }
}









