import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeatherStation, WeatherStationSummary } from '../../../common/interfaces/weather-station.interface';

@Component({
    selector: 'ngx-weather-station-outline',
    templateUrl: './weather-station-outline.component.html',
    styleUrls: ['./weather-station-outline.component.scss'],
})
export class WeatherStationOutlineComponent implements OnInit, OnChanges {
    @Output() close: EventEmitter<void> = new EventEmitter();
    @Input() wsLatest: WeatherStationSummary = {
    // user: {id: '', name: '', nearest_city: 'Colombo', location: [0, 0]},
        weatherData: {
            temperature: 0,
            humidity: 0,
            pressure: 0,
            precipitation: 0,
            // solar_irradiance: 0,
            percentage_light_intensity: 0,
            timestamp: new Date().getTime(),
        } as any,
        pointsOfUser: {
            amount: 0,
        } as any,
    };
    @Input() ws: WeatherStation = {
        _id: null,
        coordinates: {lat: 0, long: 0},
        name: '',
        nearest_city: 'Colombo',
        user_ids: [],
    };
    updatedOnFormatted: string = '';
    btnHistoryDisabled = false;
    // screenwidth = '';
    // screenheight = '';

    constructor(private _router: Router) { }

    ngOnInit(): void {
        if (this.wsLatest.weatherData) {
            this.updatedOnFormatted = moment(this.wsLatest.weatherData.timestamp).format('YYYY-MM-DD HH:mm');
            this.btnHistoryDisabled = false;
        } else {
            this.updatedOnFormatted = '-';
            this.btnHistoryDisabled = true;
        }
        // this.screenwidth = `${document.body.clientWidth} / ${document.body.offsetWidth} / ${document.body.scrollWidth}`;
        // this.screenheight = `${document.body.clientHeight} / ${document.body.offsetHeight} / ${document.body.scrollHeight}`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.ws_summary) {
            this.ngOnInit();
        }
    }

    closeThis() {
        this.close.emit();
    }

    viewWeatherStationHistory() {
        const state = {
            state: {
                weatherStation: this.ws,
                latest: this.wsLatest,
            },
        };
        this._router.navigate(['ws', this.ws._id], state);
    }
}
