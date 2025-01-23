import { NgModule } from '@angular/core';
import { WeatherStationModule } from '../../modules/weather-station/weather-station.module';
import { HomeComponent } from './home.component';
import { MapComponent } from '../../@components/map/map.component';
import { HeaderComponent } from '../../@theme/components';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        HeaderComponent,
        CommonModule,
        WeatherStationModule,
        MapComponent,
    ],
    declarations: [
        HomeComponent,
    ],
})
export class HomeModule {}
