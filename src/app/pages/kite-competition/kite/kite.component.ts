import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KiteApiService } from './kite-api.service';

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
}
