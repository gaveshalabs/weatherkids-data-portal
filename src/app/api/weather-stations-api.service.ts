import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherDatum, WeatherStation, WeatherStationSummary } from '../common/interfaces/weather-station.interface';

@Injectable()
export class WeatherStationsApiService {
    constructor(private httpClient: HttpClient) {}

    // Get all weather stations
    getWeatherStations() {
        return this.httpClient.get<WeatherStation[]>(
            `${environment.apiBaseUrl}/weather-stations`
        );
    }

    // Get weather station
    getWeatherStation(weather_station_id: string) {
        return this.httpClient.get<WeatherStation>(
            `${environment.apiBaseUrl}/weather-stations/${weather_station_id}`
        );
    }

    getLatestDataOfWeatherStation(weather_station_id: string) {
        return this.httpClient.get<WeatherStationSummary>(
            `${environment.apiBaseUrl}/weather-stations/latest/${weather_station_id}`
        );
    }

    getWeatherStationData(weather_station_id: string, from: string, to: string) {
        return this.httpClient.get<WeatherDatum[]>(
            // eslint-disable-next-line max-len
            `${environment.apiBaseUrl}/weather-data?weather_station_id=${weather_station_id}&from_date=${from}&to_date=${to}`
        );
    }
}
