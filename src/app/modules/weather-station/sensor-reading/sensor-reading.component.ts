import { Component, Input, OnInit } from '@angular/core';

type Sensor = 'temperature' |
'humidity' |
'pressure' |
'precipitation' |
'solar_irradiance' |
'percentage_light_intensity' |
'date' |
null ;

@Component({
    selector: 'ngx-sensor-reading',
    templateUrl: './sensor-reading.component.html',
    styleUrls: ['./sensor-reading.component.scss'],
})
export class SensorReadingComponent implements OnInit {
    @Input() sensor: Sensor = null;
    @Input() reading: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

}
