import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStationsApiService } from './weather-stations-api.service';
import { SessionApiService } from './session-api.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [WeatherStationsApiService, SessionApiService],
})
export class ApiModule {}
