import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { NbUserModule } from '@nebular/theme';

import { WeatherStationOutlineComponent } from './weather-station-outline.component';

describe('WeatherStationOutlineComponent', () => {
    let component: WeatherStationOutlineComponent;
    let fixture: ComponentFixture<WeatherStationOutlineComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                WeatherStationOutlineComponent,
            ],
            imports: [
                NbUserModule,
                MatIconModule,
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WeatherStationOutlineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
