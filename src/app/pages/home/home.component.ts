import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherStationsApiService } from '../../api/weather-stations-api.service';
import { MapComponent } from '../../@components/map/map.component';
import { WeatherStation, WeatherStationSummary } from '../../common/interfaces/weather-station.interface';
import { LoaderService } from '../../@theme/components/loader/loader.service';
import { AlertMessageService } from '../../@components/alert-message/alert-message.service';
import { Title } from '@angular/platform-browser';
import { RegisterNowComponent } from '../kite-competition/register-now-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


    weatherStations: WeatherStation[] = [];
    renderWSOutline = false;
    selectedStation: WeatherStation | null = null;
    selectedStationData: WeatherStationSummary | null = null;

    @ViewChild(MapComponent) map: MapComponent;
    @ViewChild('wsOutline') wsOutlineElement!: ElementRef;

    constructor(
        private weatherStationsApiService: WeatherStationsApiService,
        private loader: LoaderService,
        private alert: AlertMessageService,
        titleService: Title,
        private dialog: MatDialog,
        public router: Router
    ) {
        titleService.setTitle('Gavesha Data Collective | Home');
    }

    ngOnInit(): void {
        this.loader.show();
        this.loadWeatherStations(10);
        this.openRegisterNowDialog();
    }


    openRegisterNowDialog(): void {
        this.dialog.open(RegisterNowComponent, {
            width: '85vh',
            height: '68vh',
            panelClass: 'full-screen-dialog',
        });
    }

    async onWeatherStationSelected(selectedMarker: WeatherStation | {lat: number; lng: number}) {
        function isLatLng(obj: any): obj is {lat: number; lng: number} {
            return obj.lat !== undefined;
        }
        let station!: WeatherStation;
        if (isLatLng(selectedMarker)) {
            for (let i = 0; i < this.weatherStations.length; i++) {
                const ws = this.weatherStations[i];
                if (ws.coordinates.lat === selectedMarker.lat && ws.coordinates.long === selectedMarker.lng) {
                    station = ws;
                    break;
                }
            }
        // if (!user) {
        //   console.error('Could not find a weather observation data for the selected marker');
        //   return;
        // }
        } else {
        // user = selectedMarker;
            station = this.weatherStations.filter(ws => ws._id === selectedMarker._id)[0];
        }
        this.map.setView([station.coordinates.lat, station.coordinates.long]);
        this.selectedStation = {...station};
        this.weatherStationsApiService.getLatestDataOfWeatherStation(this.selectedStation._id).subscribe((summary) => {
            this.selectedStationData = summary;
            this.renderWSOutline = true;
        });
        // this._renderMilestones(user);

        // this._router.navigate([''], {queryParams: {station: user.id}});

        /* try {
        this.selectedStation = await this._api.getWeatherStation(user.id);
        this.renderWSOutline = true;
      } catch(err) {
        this._status.showFailedMessage(
          'Could not load data. Please try again later',
          'දත්ත බාගත කිරීමට නොහැකි වුනා. කරුණාකර මද වේලාවකින් නැවත උත්සාහ කරන්න.'
        );
      } */
    }

    onWeatherStationDeselected() {
        if (this.selectedStation) {
            this.map.deselectMarker([this.selectedStation.coordinates.lat, this.selectedStation.coordinates.long]);
        }
        this.renderWSOutline = false;
        this.selectedStation = null;
    }

    deselectAllWS() {
        this.onWeatherStationDeselected();
        this.map.resetView();
    }

    private loadWeatherStations(retryCount: number) {
        console.info('Load data: remaining attempts', retryCount);
        if (!retryCount) {
            this.loader.hide();
            this.alert.alertError('Error loading weather stations');
            return;
        }
        this.weatherStationsApiService.getWeatherStations().subscribe(
            (data: WeatherStation[]) => {
                this.weatherStations = data || [];
                this.weatherStations.forEach(ws => {
                    const loc = {
                        lat: ws.coordinates.lat,
                        lng: ws.coordinates.long,
                    };
                    this.map.renderMarker(loc, false);
                });
                this.loader.hide();
            },
            error => {
                console.error(error);
                setTimeout(() => this.loadWeatherStations(--retryCount), 500);
            }
        );
    }

    isWeatherRoute(): boolean {
        return this.router.url.includes('/weather');
      }
}
