import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HomeModule } from './home/home.module';
import { WeatherStationHistoryModule } from './weather-station-history/weather-station-history.module';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        HomeModule,
        WeatherStationHistoryModule,
        MiscellaneousModule,
    ],
    declarations: [PagesComponent],
})
export class PagesModule {}
