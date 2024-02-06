import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStationHistoryComponent } from './weather-station-history.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { WeatherStationModule } from '../../modules/weather-station/weather-station.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbSidebarModule } from '@nebular/theme';
import { SharedModule } from '../../modules/shared/shared.module';


@NgModule({
    declarations: [
        WeatherStationHistoryComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: ':ws_id',
                component: WeatherStationHistoryComponent,
            },
        ]),
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        NgChartsModule,
        WeatherStationModule,
        ThemeModule,
        SharedModule,
    ],
})
export class WeatherStationHistoryModule { }
