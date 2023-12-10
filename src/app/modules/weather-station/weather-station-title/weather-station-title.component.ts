import { Component, Input, OnInit } from '@angular/core';
import { WeatherStation } from '../../../common/interfaces/weather-station.interface';

@Component({
    selector: 'ngx-weather-station-title',
    templateUrl: './weather-station-title.component.html',
    styleUrls: ['./weather-station-title.component.scss'],
})
export class WeatherStationTitleComponent implements OnInit {
    private _defaultUser: WeatherStation = {
        _id: null, name: 'Lanka', nearest_city: 'Colombo', coordinates: {lat: 0, long: 0}, user_ids: []};
    @Input() user: WeatherStation = this._defaultUser;
    @Input() compactPictureContainer = false;

    constructor() { }

    ngOnInit(): void {
        if (!this.user) {
            this.user = this._defaultUser;
        }
    }

}
