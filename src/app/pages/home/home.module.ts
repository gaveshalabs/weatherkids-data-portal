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
import { MapComponent } from '../../@components/map/map.component';
import { HeaderComponent } from '../../@theme/components';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        HeaderComponent,
        CommonModule,
        // ThemeModule,
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
        // SharedModule,
        MapComponent,
    ],
    declarations: [
        HomeComponent,
    ],
})
export class HomeModule {}
