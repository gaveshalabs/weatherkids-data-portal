import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WeatherStationHistoryModule } from './weather-station-history/weather-station-history.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        HomeModule,
        WeatherStationHistoryModule,
        MiscellaneousModule,
        MatIconModule,
        
    ],
    declarations: [PagesComponent],
})
export class PagesModule {}
