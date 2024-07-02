import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngTuple } from 'leaflet';


@Component({
    selector: 'ngx-kite-competition-map',
    templateUrl: './kite-map.component.html',
    styleUrls: ['./kite-map.component.scss'],
})
export class KiteCompetitionMapComponent implements OnInit {

    @Input() locations: Array<[number, number] | { lat: number; lng: number }> = [];
    map: any;
    kiteIcon: L.Icon;
    private kiteMarkers: L.Marker[] = [];

    ngOnInit(): void {
      this.configMap();
      if (this.locations.length > 0) {
        this.renderKiteMarkers();
      }
  }

    configMap() {
        this.map = L.map('map',
            {
                center: [7.8731, 80.7718],
                zoom: 8,
            });

        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        }).addTo(this.map);

        this.kiteIcon = L.icon({
          iconUrl: '../../../../assets/images/kite-competition/kite_marker.png',
          iconSize: [52, 52],
          iconAnchor: [20, 40],
        });
    }

    renderKiteMarker(location: [number, number] | { lat: number; lng: number }) {
      const latLng = Array.isArray(location) ? location as LatLngTuple : [location.lat, location.lng] as LatLngTuple;
      const marker = L.marker(latLng, { icon: this.kiteIcon }).addTo(this.map);
      this.kiteMarkers.push(marker);
      return marker;
    }

    renderKiteMarkers() {
      this.locations.forEach(location => {
        this.renderKiteMarker(location);
      });
    }
}

