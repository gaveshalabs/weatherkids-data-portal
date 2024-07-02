import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-kite',
    templateUrl: './kite.component.html',
    styleUrls: ['./kite.component.scss'],
})
export class KiteComponent implements OnInit{

    public getCoordinatesValue: any;
    actualLocations: Array<[number, number]> = [];
    constructor(private http: HttpClient){

    }

    ngOnInit(): void {
        this.getMethod();
    }

    public getMethod(){
        this.http.get('https://data-api.gavesha.space/api').subscribe((data) => {
            this.getCoordinatesValue = data;
        });
    }

    mockLocations: Array<[number, number] | { lat: number; lng: number }> = [
        [7.8731, 80.7718],
        [6.9271, 79.8612],
        [6.9275, 79.8610],
        [7.2964, 80.6350],
        [6.9273, 79.8829],
        [6.9462, 79.8630],
        [7.4920, 80.3548],
        [6.9055, 79.9727],
        [6.0397, 80.2180],
        [6.9275, 79.9864],
        [9.6615, 80.0255],
    ];
}
