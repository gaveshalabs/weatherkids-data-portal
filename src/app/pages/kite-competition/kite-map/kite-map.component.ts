import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
    selector: 'ngx-kite-competition-map',
    templateUrl: './kite-map.component.html',
    styleUrls: ['./kite-map.component.scss'],
})
export class KiteCompetitionMapComponent implements OnInit {

    ngOnInit(): void {
        this.configMap();
    }

    map: any;

    configMap() {
        this.map = L.map('map',
            {
                center: [7.8731, 80.7718],
                zoom: 8,
            });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
    }


}
