import { NgModule } from '@angular/core';
import { MapComponent } from '../../@components/map/map.component';
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
    ],
    declarations: [
        HomeComponent,
        MapComponent,
    ],
})
export class HomeModule {}
