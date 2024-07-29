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
import { HeightbarchartComponent } from './height-barchart/height-barchart.component';
import { FlyingchartComponent } from './flying-timechart/flying-chart.component';
import { kitedetailsComponent } from './kite-detailscard/kite-detailscard.component';
import { HeightComparisonComponent } from './height-comparison/height-comparison.component';
import { AirtimeRecordComponent } from './airtime-record/airtime-record.component';
import { KiteDashboardComponent } from './kite-dashboard/kite-dashboard.component';
import { KiteRoutingModule } from './kite-routing.module';
import { TotalAttempsComponent } from './total-attemps/total-attemps.component';
import { NbActionsModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { MatIconModule } from '@angular/material/icon';
import { KiteApiService } from './kite/kite-api.service';
import { ToggleCardComponent } from './togal-card/toggle-card.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WantToKnowComponent } from './want-to-know/want-to-know.component';



@NgModule({
    declarations: [
        RegisterNowComponent,
        KiteComponent,
        KiteCompetitionMapComponent,
        kitedetailsComponent,
        HeightComparisonComponent,
        AirtimeRecordComponent,
        KiteDashboardComponent,
        TotalAttempsComponent,
        ToggleCardComponent,
        WantToKnowComponent,




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
        MatSlideToggleModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatCardModule,
        // ToggleCardComponent,



    ],
    exports: [AirtimeRecordComponent, TotalAttempsComponent, HeightComparisonComponent,
    ],

    providers: [KiteApiService],
})
export class KiteCompetitionModule {

}
