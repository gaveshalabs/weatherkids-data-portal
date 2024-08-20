import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { WeatherStation } from '../../../common/interfaces/weather-station.interface';

@Component({
    selector: 'ngx-kite-search',
    templateUrl: './kite-search.component.html',
    styleUrls: ['./kite-search.component.scss'],
})
export class KiteSearchComponent implements OnInit {
    @Output() selected: EventEmitter<WeatherStation> = new EventEmitter();
    @Output() close: EventEmitter<void> = new EventEmitter();
    @Input() wsList: WeatherStation[] = [];

    searchInput: string | WeatherStation = '';
    wsFiltered: any[] = [];
    showClose = false;

    constructor() { }

    ngOnInit(): void {
        if (this.close.observers.length) {
            this.showClose = true;
        }
    }

    filterWSes() {
        this.wsFiltered = this.wsList.filter(ws => {
            const searchText = typeof this.searchInput === 'string' ?
                this.searchInput.toLowerCase() : this.searchInput.name.toLowerCase();
            return ws.name.toLowerCase().indexOf(searchText) >= 0; /* ||
        (ws.nearest_city && ws.nearest_city.toLowerCase().indexOf(searchText) >= 0) */
        });
    }

    loadWeatherStationSummary(event: MatAutocompleteSelectedEvent) {
        this.selected.emit(event.option.value);
    }

    selectedOptionDisplay(ws: WeatherStation) {
        if (typeof ws === 'string') {
            return ws;
        }
        return ws ? ws.name : '';
    }

    closeThis() {
        this.close.emit();
    }
}
