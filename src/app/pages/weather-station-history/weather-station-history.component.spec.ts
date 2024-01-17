import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStationHistoryComponent } from './weather-station-history.component';

describe('WeatherStationHistoryComponent', () => {
    let component: WeatherStationHistoryComponent;
    let fixture: ComponentFixture<WeatherStationHistoryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WeatherStationHistoryComponent],
        });
        fixture = TestBed.createComponent(WeatherStationHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
