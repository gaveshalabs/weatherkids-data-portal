import { NgModule } from '@angular/core';
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
import { SolarComponent } from './circle-progress/solar.component';
import { KittenComponent } from './kitten/kitten.component';
import { HeightbarchartComponent } from './height-barchart/height-barchart.component';
import { FlyingchartComponent } from './flying-timechart/flying-chart.component';
import { kitedetailsComponent } from './kite-detailscard/kite-detailscard.component';
import { HeightComparisonComponent } from './height-comparison/height-comparison.component';
import { AirtimeRecordComponent } from './airtime-record/airtime-record.component';
import { SpeedRecordComponent } from './speed-record/speed-record.component';
import { KiteDashboardComponent } from './kite-dashboard/kite-dashboard.component';
import { KiteRoutingModule } from './kite-routing.module';
import { TotalAttempsComponent } from './total-attemps/total-attemps.component';
import { NbActionsModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from "../../@theme/theme.module";
import { MatIconModule } from '@angular/material/icon';
import { KiteApiService } from './kite/kite-api.service';



@NgModule({
    declarations: [
        RegisterNowComponent,
        KiteComponent,
        KiteCompetitionMapComponent,
        SolarComponent,
        KittenComponent,
        kitedetailsComponent,
        HeightComparisonComponent,
        AirtimeRecordComponent,
        SpeedRecordComponent,
        KiteDashboardComponent,
        TotalAttempsComponent,

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
        HeightbarchartComponent,
        FlyingchartComponent,
        KiteRoutingModule,
        NbActionsModule,
        NbUserModule,
        ThemeModule,
        MatIconModule,
    ],
    exports: [AirtimeRecordComponent, TotalAttempsComponent,HeightComparisonComponent,
    ],

    providers: [KiteApiService],
})
export class KiteCompetitionModule {

}
