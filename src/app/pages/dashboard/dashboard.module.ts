import { NgModule } from '@angular/core';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
} from '@nebular/theme';
// import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule } from '@angular/forms';
import { RoundPipe } from '../../@theme/pipes';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        // ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        RoundPipe,
    ],
    declarations: [
        DashboardComponent,
        TemperatureDraggerComponent,
        TemperatureComponent,
        WeatherComponent,
    ],
})
export class DashboardModule {}
