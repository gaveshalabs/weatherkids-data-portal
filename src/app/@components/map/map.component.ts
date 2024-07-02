import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Class,
  Control,
  Icon,
  LatLng,
  LatLngTuple,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';

@Component({
    selector: 'ngx-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
    @Input() zoom: number = 8;
    @Input() center: LatLngTuple = [7.8731, 80.7718];
    @Input() mapId: string = 'map';
    @Output() mapSelect: EventEmitter<{ lat: number; lng: number }> =
        new EventEmitter();
    @Output() markerSelect: EventEmitter<{ lat: number; lng: number }> =
        new EventEmitter();
    private mapRendered!: Map;
    private markerIcons: {
        lightBlue?: Icon;
        lightOrange?: Icon;
        darkBlue: Icon;
        darkOrange: Icon;
        darkGray: Icon;
    };
    private markers: Marker[] = [];
    private originalIconsOfMarkers: Icon[] = [];

    @Input() locations: Array<[number, number] | { lat: number; lng: number }> = [];
    kiteIcon: L.Icon;
    private kiteMarkers: L.Marker[] = [];

    constructor() {
        // const CustomIcon: {new(options: any): any} & typeof Class = DivIcon.extend({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const CustomIcon: (new (options: any) => any) & typeof Class =
            Icon.extend({
                options: {
                    // iconRetinaUrl: 'assets/marker-icon-2x.png',
                    // iconUrl: 'assets/marker-icon.png',
                    // shadowUrl: 'assets/marker-shadow.png',
                    // iconAnchor: [12, 41],
                    // shadowSize: [41, 41]
                    iconSize: [54, 82],

                    // html: `<span class="material-icons">place</span>`,
                    // iconSize: [0,0],
                },
            });
        this.markerIcons = {
            darkBlue: new CustomIcon({
                iconUrl: 'assets/images/54x82_Pointer.png',
                iconSize: [27, 41],
                iconAnchor: [14, 41],
                id: 'darkBlue',
            }),
            darkOrange: new CustomIcon({
                iconUrl: 'assets/images/54x82_Pointer_Orange.png',
                iconSize: [38, 57],
                iconAnchor: [19, 57],
                id: 'darkOrange',
            }),
            darkGray: new CustomIcon({
                iconUrl: 'assets/images/54x82_Pointer_Gray.png',
                iconSize: [27, 41],
                iconAnchor: [14, 41],
                id: 'darkGray',
            }),
            /* darkBlue: new CustomIcon({ // use DivIcon for this
        className: 'map-marker',
        iconAnchor: [18,36],
        id: 'darkBlue'
      }) as any, */
            /* darkOrange: new CustomIcon({ // use DivIcon for this
        className: 'map-marker marker-selected',
        iconAnchor: [24,48],
        id: 'darkOrange'
      }) as any, */
        };
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.initMap();

      if (this.locations.length > 0) {
        this.renderKiteMarkers();
      }
    }

    renderMarker(
        location: [number, number] | { lat: number; lng: number },
        isInactive?: boolean
    ) {
        const icon = isInactive
            ? this.markerIcons.darkGray
            : this.markerIcons.darkBlue;
        const marker = new Marker(location)
            .setIcon(icon)
            .addTo(this.mapRendered);
            // .addEventListener('click', (event: LeafletMouseEvent) => {
            //     this.markerSelect.emit(event.latlng);
            //     this.setView(event.latlng);
            // });
        this.markers.push(marker);
        this.originalIconsOfMarkers.push(icon);
        return marker;
    }

     /* start render kite markers*/


    selectMarker(location: { lat: number; lng: number } | Marker) {
        for (let i = 0; i < this.markers.length; i++) {
            const m = this.markers[i];
            if (location instanceof Marker) {
                this._showMarkerWithActiveStatus(
                    m,
                    m === location,
                    this.originalIconsOfMarkers[i]
                );
            } else {
                this._showMarkerWithActiveStatus(
                    m,
                    m.getLatLng().lat === location.lat &&
                        m.getLatLng().lng === location.lng,
                    this.originalIconsOfMarkers[i]
                );
            }
        }
    }

    deselectMarker(location: [number, number]) {
        this.markers.map((m, i) => {
            if (
                m.getLatLng().lat === location[0] &&
                m.getLatLng().lng === location[1]
            ) {
                m.setIcon(this.originalIconsOfMarkers[i]);
            }
        });
    }

    setView(
        location: [number, number] | { lat: number; lng: number } | Marker,
        zoom?: number,
    ) {
        let latlng: { lat: number; lng: number };
        if (location instanceof LatLng) {
            // latlng = location.clone();
            latlng = { ...location };
        } else if (location instanceof Array) {
            latlng = { lat: location[0], lng: location[1] };
        } else if (location instanceof Marker) {
            // latlng = location.getLatLng().clone();
            latlng = { ...location.getLatLng() };
        } else {
            latlng = { ...location };
        }

        this.selectMarker(location instanceof Marker ? location : latlng);
        const currentZoom = zoom || (this.mapRendered.getZoom() < 14 ? 14 : this.mapRendered.getZoom());
        if (document.body.clientWidth <= 720) {
            latlng.lat += 0.015;
        }
        this.mapRendered.flyTo(latlng, currentZoom, { animate: true });
    }

    resetView() {
        this.mapRendered.setView(this.center, this.zoom);
    }

    private initMap(): void {
        this.mapRendered = map(this.mapId, {
            center: this.center,
            zoom: this.zoom,
            zoomControl: false,
        });
        new Control.Zoom({ position: 'bottomright' }).addTo(this.mapRendered);
        // this.mapRendered.addEventListener(
        //     'click',
        //     (event: LeafletMouseEvent) => {
        //         this.mapSelect.emit(event.latlng);
        //     }
        // );

        const tiles = tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}',
            {
                maxZoom: 15,
                minZoom: 5,
                attribution:
                    '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                ext: 'png'
                  }
        );

        tiles.addTo(this.mapRendered);

        this.kiteIcon = icon({
          iconUrl: '../../../../assets/images/kite-competition/kite-marker-1.png',
          iconSize: [52, 52],
          iconAnchor: [20, 40],
        });
    }

  renderKiteMarker(location: [number, number] | { lat: number; lng: number }) {
    const latLng = Array.isArray(location) ? location as LatLngTuple : [location.lat, location.lng] as LatLngTuple;
    const kiteMarker = marker(latLng, { icon: this.kiteIcon }).addTo(this.mapRendered);
    this.kiteMarkers.push(kiteMarker);
    return marker;
  }

  renderKiteMarkers() {
    this.locations.forEach(location => {
      this.renderKiteMarker(location);
    });
  }

    private _showMarkerWithActiveStatus(
        m: Marker,
        active: boolean,
        originalIcon: Icon
    ) {
        if (active) {
            m.setIcon(this.markerIcons.darkOrange);
            const pos = this.mapRendered
                .latLngToLayerPoint(m.getLatLng())
                .round();
            m.setZIndexOffset(pos.y);
        } else {
            m.setIcon(originalIcon);
            m.setZIndexOffset(0);
        }
    }
}
