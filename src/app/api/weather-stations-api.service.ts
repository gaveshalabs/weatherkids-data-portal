import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherStation, WeatherStationSummary } from '../common/interfaces/weather-station.interface';

@Injectable()
export class WeatherStationsApiService {
    constructor(private httpClient: HttpClient) {}

    // Get all weather stations
    getWeatherStations() {
        return this.httpClient.get<WeatherStation[]>(
            `${environment.apiBaseUrl}/weather-stations`
        );
    }

    getLatestDataOfWeatherStation(weather_station_id: string) {
        return this.httpClient.get<WeatherStationSummary>(
            `${environment.apiBaseUrl}/weather-stations/latest/${weather_station_id}`
        );
    }
}
