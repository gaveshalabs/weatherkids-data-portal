import { NgModule } from '@angular/core';
// import {
//     NbActionsModule,
//     NbButtonModule,
//     NbCardModule,
//     NbTabsetModule,
//     NbUserModule,
//     NbRadioModule,
//     NbSelectModule,
//     NbListModule,
//     NbIconModule,
// } from '@nebular/theme';
// import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { WeatherStationModule } from '../../modules/weather-station/weather-station.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
    imports: [
        ThemeModule,
        // NbCardModule,
        // NbUserModule,
        // NbButtonModule,
        // NbTabsetModule,
        // NbActionsModule,
        // NbRadioModule,
        // NbSelectModule,
        // NbListModule,
        // NbIconModule,
        // NbButtonModule,
        WeatherStationModule,
        SharedModule,
    ],
    declarations: [
        HomeComponent,
    ],
})
export class HomeModule {}
