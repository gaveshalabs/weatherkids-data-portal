import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { AlertMessageService } from '../../@components/alert-message/alert-message.service';
import { LoaderService } from '../../@theme/components/loader/loader.service';
import { WeatherStationsApiService } from '../../api/weather-stations-api.service';
import { WeatherStationSummary, WeatherStation } from '../../common/interfaces/weather-station.interface';
import 'chartjs-adapter-moment';
import { Title } from '@angular/platform-browser';
import { MapComponent } from '../../@components/map/map.component';

interface DatePreset {
    name: string;
    from?: moment.Moment;
    to?: moment.Moment;
}

@Component({
    selector: 'ngx-weather-station-history',
    templateUrl: './weather-station-history.component.html',
    styleUrls: ['./weather-station-history.component.scss'],
    animations: [
        trigger(
            'inAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ width: 0, opacity: 0 }),
                        animate('0.33s ease-out',
                            style({ width: '100%', opacity: 1 })),
                    ]
                ),
            ]
        ),
    ],
})
export class WeatherStationHistoryComponent implements OnInit {
    @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;
    @ViewChild(MatDateRangePicker) dateRangePicker!: MatDateRangePicker<moment.Moment>;
    @ViewChild(MapComponent) map: MapComponent;
    thisWeatherStationLatestData: WeatherStationSummary = {weatherData: null, pointsOfUser: null};
    thisWeatherStation: WeatherStation = {
        _id: 'none',
        coordinates: {lat: 0, long: 0},
        name: 'Unknown',
        user_ids: [],
    };
    weatherStations: WeatherStation[] = [];
    mapCenter = [7.8731, 80.7718];
    updatedOnFormatted: string = '';
    showSearchBar = false;
    sensorReadings = {
        temperature: {
            datasets: [
                {
                    data: [],
                    label: 'Temperature',
                    backgroundColor: '#c83e4d',
                    borderColor: '#c83e4d',
                    pointBackgroundColor: '#c83e4d',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#c83e4d',
                    // fill: 'origin'
                },
            ],
        } as ChartData<'line'>,
        humidity: {
            datasets: [
                {
                    data: [],
                    label: 'Humidity',
                    backgroundColor: '#E18335',
                    borderColor: '#E18335',
                    pointBackgroundColor: '#E18335',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#E18335',
                },
            ],
        } as ChartData<'line'>,
        pressure: {
            datasets: [
                {
                    data: [],
                    label: 'Pressure',
                    backgroundColor: '#1976d2',
                    borderColor: '#1976d2',
                    pointBackgroundColor: '#1976d2',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#1976d2',
                },
            ],
        } as ChartData<'line'>,
        precipitation: {
            datasets: [
                {
                    data: [],
                    label: 'Precipitation',
                    backgroundColor: '#1BE7FF',
                },
            ],
        } as ChartData<'bar'>,
        percentage_light_intensity: {
            datasets: [
                {
                    data: [],
                    label: 'Light Intensity Percentage',
                    backgroundColor: '#EEB902',
                    borderColor: '#EEB902',
                    pointBackgroundColor: '#EEB902',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#EEB902',
                },
            ],
        } as ChartData<'line'>,
        tvoc: {
            datasets: [
                {
                    data: [],
                    label: 'TVOC',
                    backgroundColor: '#8FC93A',
                    borderColor: '#8FC93A',
                    pointBackgroundColor: '#8FC93A',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#8FC93A',
                },
            ],
        } as ChartData<'line'>,
    };
    chartOpts: {
        temperature: ChartOptions<'line'>;
        humidity: ChartOptions<'line'>;
        pressure: ChartOptions<'line'>;
        precipitation: ChartOptions<'bar'>;
        percentage_light_intensity: ChartOptions<'line'>;
        tvoc: ChartOptions<'line'>;
    } = {} as any;
    dataFilteringForm: FormGroup;
    presetDateRanges: DatePreset[] = [
        {name: 'Last 7 days', from: moment().subtract(7, 'days'), to: moment()},
        {name: 'Last 30 days', from: moment().subtract(30, 'days'), to: moment()},
        {name: 'This month', from: moment().startOf('month'), to: moment()},
        // eslint-disable-next-line max-len
        {name: 'Last month', from: moment().subtract(1, 'month').startOf('month'), to: moment().subtract(1, 'month').endOf('month')},
        {name: 'Last 3 months', from: moment().subtract(90, 'days'), to: moment()},
        {name: 'This year', from: moment().startOf('year'), to: moment()},
        {name: 'Custom'},
    ];
    private _defaultLineChartOptions = {
        elements: {
            line: {
                tension: 0.5,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'Y-M-D',
                        hour: 'Y-M-D HH',
                        minute: 'HH:mm',
                    },
                },
            },
        },
        plugins: {
            legend: {display: true},
            zoom: {
                pan: {enabled: true, mode: 'xy', modifierKey: 'ctrl'},
                zoom: {
                    drag: {enabled: true },
                    mode: 'xy',
                },
            },
        },
        spanGaps: true,
        showLine: true,
        maintainAspectRatio: false,
    } as ChartOptions<'line'>;
    private _defaultBarChartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'Y-M-D',
                        hour: 'Y-M-D HH',
                        minute: 'HH:mm',
                    },
                },
                ticks: {
                    autoSkip: false,
                },
                offset: true,
                offsetAfterAutoskip: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {display: true},
            zoom: {
                pan: {enabled: true, mode: 'xy', modifierKey: 'ctrl'},
                zoom: {
                    drag: {enabled: true },
                    mode: 'xy',
                },
            },
        },
        maintainAspectRatio: false,
    } as ChartOptions<'bar'>;
    private _currentWeatherStationId: string = '';
    private _lastRequestedDateRange = {start: moment(), end: moment()};

    constructor(
        route: ActivatedRoute,
        private _router: Router,
        private _api: WeatherStationsApiService,
        private _alert: AlertMessageService,
        private _loader: LoaderService,
        fb: FormBuilder,
        dateAdapter: DateAdapter<Date>,
        titleService: Title,
    ) {
        titleService.setTitle('Gavesha Data Collective | Weather Station History');
        this.dataFilteringForm = fb.group({
            dateRangeStart: [this.presetDateRanges[0].from],
            dateRangeEnd: [this.presetDateRanges[0].to],
            datePreset: [null],
        });
        this._setPresetNameIfApplicable();
        dateAdapter.setLocale('en-GB');

        // copy options separately to for mutually exclusive references between charts
        this.chartOpts.temperature = {
            elements: {...this._defaultLineChartOptions.elements},
            scales: {
                ...this._defaultLineChartOptions.scales,
                y: {
                    title: {
                        display: true,
                        text: '°C',
                    },
                },
            },
            plugins: {...this._defaultLineChartOptions.plugins},
            spanGaps: this._defaultLineChartOptions.spanGaps,
            maintainAspectRatio: this._defaultLineChartOptions.maintainAspectRatio,
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'temperature',
            },
        };
        this.chartOpts.humidity = {
            elements: {...this._defaultLineChartOptions.elements},
            scales: {
                ...this._defaultLineChartOptions.scales,
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '%',
                    },
                },
            },
            plugins: {...this._defaultLineChartOptions.plugins},
            spanGaps: this._defaultLineChartOptions.spanGaps,
            maintainAspectRatio: this._defaultLineChartOptions.maintainAspectRatio,
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'humidity',
            },
        };
        this.chartOpts.pressure = {
            elements: {...this._defaultLineChartOptions.elements},
            scales: {
                ...this._defaultLineChartOptions.scales,
                y: {
                    title: {
                        display: true,
                        text: 'Pa',
                    },
                },
            },
            plugins: {...this._defaultLineChartOptions.plugins},
            spanGaps: this._defaultLineChartOptions.spanGaps,
            maintainAspectRatio: this._defaultLineChartOptions.maintainAspectRatio,
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'pressure',
            },
        };
        this.chartOpts.precipitation = {
            elements: {...this._defaultBarChartOptions.elements},
            scales: {
                ...this._defaultBarChartOptions.scales,
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'mm',
                    },
                },
            },
            plugins: {...this._defaultBarChartOptions.plugins},
            maintainAspectRatio: this._defaultBarChartOptions.maintainAspectRatio,
            parsing: {
                xAxisKey: 'datetime',
                yAxisKey: 'precipitation',
            },
        };
        this.chartOpts.percentage_light_intensity = {
            elements: {...this._defaultLineChartOptions.elements},
            scales: {
                ...this._defaultLineChartOptions.scales,
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '%',
                    },
                },
            },
            plugins: {...this._defaultLineChartOptions.plugins},
            spanGaps: this._defaultLineChartOptions.spanGaps,
            maintainAspectRatio: this._defaultLineChartOptions.maintainAspectRatio,
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'percentage_light_intensity',
            },
        };
        this.chartOpts.tvoc = {
            elements: {...this._defaultLineChartOptions.elements},
            scales: {
                ...this._defaultLineChartOptions.scales,
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ppb',
                    },
                },
            },
            plugins: {...this._defaultLineChartOptions.plugins},
            spanGaps: this._defaultLineChartOptions.spanGaps,
            maintainAspectRatio: this._defaultLineChartOptions.maintainAspectRatio,
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'tvoc',
            },
        };

        const routeStateWeatherStation = _router.getCurrentNavigation()?.extras.state?.weatherStation as WeatherStation;
        // eslint-disable-next-line max-len
        const routeStateDataSummary = _router.getCurrentNavigation()?.extras.state?.latest as WeatherStationSummary;
        route.params.subscribe(params => {
            // console.debug('from url', this.thisWeatherStation, params.ws_id);
            if (!routeStateDataSummary || routeStateDataSummary.weatherData?.weather_station_id !== params.ws_id) {
                this._currentWeatherStationId = params.ws_id;
                this._renderWeatherStation(params.ws_id);
                this._renderCharts(params.ws_id);
            }
        });

        if (routeStateDataSummary) {
            this.thisWeatherStation = routeStateWeatherStation;
            this.thisWeatherStationLatestData = routeStateDataSummary;
            // console.log('from home', routeStateDataSummary);
            this._currentWeatherStationId = routeStateDataSummary.weatherData?.weather_station_id;
            this._renderCharts(routeStateDataSummary.weatherData?.weather_station_id);
        }
        this.updatedOnFormatted = routeStateDataSummary ?
            moment(routeStateDataSummary.weatherData.timestamp).format('YYYY-MM-DD HH:mm') :
            '-';
    }

    async ngOnInit() {
        this.loadWeatherStations(10);
    }

    showSearch() {
        this.showSearchBar = true;
    }

    hideSearch() {
        this.showSearchBar = false;
    }

    async onWeatherStationSelected(weather_station: WeatherStation) {
        this._router.navigate(['ws', weather_station._id]);
        this.showSearchBar = false;
    }

    loadDataForPresetDateRange($event: MatSelectChange) {
        if ($event.value.name === 'Custom') {
            return;
        }
        this.dataFilteringForm.patchValue({
            dateRangeStart: $event.value.from,
            dateRangeEnd: $event.value.to,
        });
        this._renderCharts(this._currentWeatherStationId, $event.value.from, $event.value.to);
    }

    onDateRangePickerClosed() {
        const filterConfig = this.dataFilteringForm.value;
        if (!this._lastRequestedDateRange.start.isSame(filterConfig.dateRangeStart) ||
      !this._lastRequestedDateRange.end.isSame(filterConfig.dateRangeEnd)) {
            let end: moment.Moment = filterConfig.dateRangeEnd;
            end = end.endOf('d');
            this._renderCharts(this._currentWeatherStationId, filterConfig.dateRangeStart, filterConfig.dateRangeEnd);
        }
        this._setPresetNameIfApplicable();
    }

    deselectAllWS() {

    }

    private loadWeatherStations(retryCount: number) {
        console.info('Load data: remaining attempts', retryCount);
        if (!retryCount) {
            this._requestFailed();
            return;
        }
        this._api.getWeatherStations().subscribe(
            (data: WeatherStation[]) => {
                this.weatherStations = data || [];
                this.weatherStations.forEach(ws => {
                    const loc = {
                        lat: ws.coordinates.lat,
                        lng: ws.coordinates.long,
                    };
                    this.map.renderMarker(loc, false);
                });
                this._loader.hide();
                this.map.setView(
                    [this.thisWeatherStation.coordinates.lat, this.thisWeatherStation.coordinates.long],
                    10
                );
            },
            err => {
                console.error(err);
                setTimeout(() => this.loadWeatherStations(--retryCount), 500);
            }
        );
    }

    private async _renderWeatherStation(wsid: string) {
        this._loader.show();

        this._api.getWeatherStation(wsid).subscribe(
            respws => {
                this.thisWeatherStation = respws;
                this._api.getLatestDataOfWeatherStation(wsid).subscribe(
                    respdata => {
                    // if (!resp.success) {
                    //   return this._requestFailed();
                    // }
                        this.thisWeatherStationLatestData = respdata;
                        this.updatedOnFormatted = respdata.weatherData ?
                            moment(respdata.weatherData.timestamp).format('YYYY-MM-DD HH:mm') :
                            '-';
                    },
                    (err) => this._requestFailed(err)
                );
            }
        );
    }

    private _renderCharts(userId: string, from?: moment.Moment, to?: moment.Moment) {
        this._loader.show();
        const filterConfig = this.dataFilteringForm.value;
        this._lastRequestedDateRange = {start: filterConfig.dateRangeStart, end: filterConfig.dateRangeEnd};
        from = from || filterConfig.dateRangeStart;
        to = to || filterConfig.dateRangeEnd;
        this._api.getWeatherStationData(userId, from.toISOString(), to.toISOString())
            .subscribe(
                resp => {
                    const precipitationMap: {[key: number]: Boolean} = {};
                    let minTimestamp = new Date().getTime();
                    for (let i = 0; i < resp.length; i++) {
                        const elem = resp[i];
                        // elem.timestamp = moment(elem.timestamp).toDate().getTime() as any;
                        if (minTimestamp > elem.timestamp) {
                            minTimestamp = elem.timestamp;
                        }

                        // bar chart doesn't render if multiple values exists for same date
                        // therefore taking only the first known value for a date
                        const timestampDate = moment(elem.timestamp).startOf('D').toDate().getTime();
                        if (elem.precipitation >= 0 && !precipitationMap[timestampDate]) {
                            precipitationMap[timestampDate] = true;
                            elem['datetime'] = new Date(elem.timestamp);
                        }
                    }
                    this.sensorReadings.temperature.datasets[0].data = resp as any;
                    this.sensorReadings.humidity.datasets[0].data = resp as any;
                    this.sensorReadings.pressure.datasets[0].data = resp as any;
                    this.sensorReadings.precipitation.datasets[0].data = resp as any;
                    this.sensorReadings.percentage_light_intensity.datasets[0].data = resp as any;
                    this.sensorReadings.tvoc.datasets[0].data = resp as any;
                    this.chartOpts.percentage_light_intensity.scales['x'].min = minTimestamp;
                    this.charts.forEach(child => {
                        child.update();
                    });
                    this._loader.hide();
                },
                (err) => this._requestFailed(err)
            );
    }

    private _requestFailed(error?: HttpErrorResponse) {
        this._loader.hide();
        if (error?.status === 400) {
            this._alert.alertError(
                'We could not find this weather station.',
                // 'හඳුනානොගත් කාළගුණ මධ්‍යස්ථානයකි.',
                // 'வானிலை நிலையத்தை கண்டுபிடிக்க முடியவில்லை.',
            );
        } else {
            this._alert.alertError('Failed to load data');
        }
    }

    private _setPresetNameIfApplicable() {
        const filterConfig = this.dataFilteringForm.value;
        const dateRangeStart = filterConfig.dateRangeStart.format('YYYY-MM-DD');
        const dateRangeEnd = filterConfig.dateRangeEnd.format('YYYY-MM-DD');
        let preset;
        for (let i = 0; i < this.presetDateRanges.length; i++) {
            const elem = this.presetDateRanges[i];
            if (elem.from?.format('YYYY-MM-DD') === dateRangeStart && elem.to?.format('YYYY-MM-DD') === dateRangeEnd) {
                preset = elem;
                break;
            }
        }
        if (preset) {
            this.dataFilteringForm.get('datePreset')?.setValue(preset);
        } else {
            this.dataFilteringForm.get('datePreset')?.setValue(this.presetDateRanges[this.presetDateRanges.length - 1]);
        }
    }
}
