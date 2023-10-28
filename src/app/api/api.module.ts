import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStationsApiService } from './weather-stations-api.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [WeatherStationsApiService],
})
export class ApiModule {}
