import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherStationsApiService {
    constructor(private httpClient: HttpClient) {}

    // Get all weather stations
    getWeatherStations() {
        return this.httpClient.get(
            `${environment.apiBaseUrl}/weather-stations`
        );
    }
}
