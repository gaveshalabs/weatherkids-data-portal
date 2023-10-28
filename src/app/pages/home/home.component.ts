import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherStationsApiService } from '../../api/weather-stations-api.service';
import { MapComponent } from '../../@components/map/map.component';
import { WeatherStation } from '../../common/interfaces/weather-station.interface';

@Component({
    selector: 'ngx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    weatherStations: WeatherStation[] = [];

    @ViewChild(MapComponent) map: MapComponent;

    constructor(private weatherStationsApiService: WeatherStationsApiService) {}

    ngOnInit(): void {
        this.weatherStationsApiService.getWeatherStations().subscribe(
            (data: WeatherStation[]) => {
                console.log(data);
                this.weatherStations = data || [];
                this.weatherStations.forEach(ws => {
                    const loc = {
                        lat: ws.coordinates.lat,
                        lng: ws.coordinates.long,
                    };
                    this.map.renderMarker(loc, false);
                });
            },
            error => {
                console.error(error);
            }
        );
    }
}
