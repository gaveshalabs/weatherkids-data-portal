import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { LeaderboardModule } from '../../@components/leaderboard/leaderboard.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { KiteCompetitionMapComponent } from './kite-map/kite-map.component';
import { KiteComponent } from './kite/kite.component';
import { RegisterNowComponent } from './register-now-dialog/register-dialog.component';
import { NbCardModule, NbIconModule, NbSelectModule, NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { DistrictvsAttemptbarchartComponent } from './district-attempt-barchart/district-attempt-barchart.component';
import { HeightComparisonComponent } from './height-comparison/height-comparison.component';
import { KiteDashboardComponent } from './kite-dashboard/kite-dashboard.component';
import { KiteRoutingModule } from './kite-routing.module';
import { NbActionsModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { MatIconModule } from '@angular/material/icon';
import { KiteApiService } from './kite/kite-api.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PlayerDataCardComponent } from './player-data-card/player-data-card.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { PlayerAttemptChartComponent } from './player-attempts-chart/player-attempt-chart.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { register } from 'swiper/element/bundle';
import { AgeAttemptbarchartComponent } from './age-attempt-barchart/age-attempt-barchart.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
    DesktopPlayerDataCardComponent,
} from './desktop-player-datacard/player-data-card/desktop-player-data-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';

register();

@NgModule({
    declarations: [
        RegisterNowComponent,
        KiteComponent,
        KiteCompetitionMapComponent,
        HeightComparisonComponent,
        KiteDashboardComponent,
        PlayerDataCardComponent,
        PlayerAttemptChartComponent,
        ReportCardComponent,
        DesktopPlayerDataCardComponent,

    ],
    imports: [
        RouterModule.forChild([]),
        MatDialogModule,
        MatListModule,
        LeaderboardModule,
        SharedModule,
        CommonModule,
        NbCardModule,
        NbIconModule,
        NbSelectModule,
        NgxEchartsModule,
        DistrictvsAttemptbarchartComponent,
        KiteRoutingModule,
        NbActionsModule,
        NbUserModule,
        ThemeModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatGridListModule,
        MatExpansionModule,
        AgeAttemptbarchartComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatTooltipModule ,

        // ToggleCardComponent,



    ],
    exports: [ HeightComparisonComponent, AgeAttemptbarchartComponent,
    ],

    providers: [KiteApiService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class KiteCompetitionModule {

}
