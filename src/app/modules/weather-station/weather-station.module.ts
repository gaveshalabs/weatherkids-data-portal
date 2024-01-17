import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { WeatherStationSearchComponent } from './weather-station-search/weather-station-search.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherStationOutlineComponent } from './weather-station-outline/weather-station-outline.component';
import { WeatherStationTitleComponent } from './weather-station-title/weather-station-title.component';
import { SensorReadingComponent } from './sensor-reading/sensor-reading.component';
import { NbUserModule } from '@nebular/theme';
import { DataValueCardComponent } from './data-value-card/data-value-card.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [
        DataValueCardComponent,
        SensorReadingComponent,
        WeatherStationSearchComponent,
        WeatherStationTitleComponent,
        WeatherStationOutlineComponent,
    ],
    imports: [
        ThemeModule,
        NbUserModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        DataValueCardComponent,
        SensorReadingComponent,
        WeatherStationSearchComponent,
        WeatherStationTitleComponent,
        WeatherStationOutlineComponent,
    ],
})
export class WeatherStationModule { }
