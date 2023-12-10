import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStationTitleComponent } from './weather-station-title.component';

describe('WeatherStationTitleComponent', () => {
  let component: WeatherStationTitleComponent;
  let fixture: ComponentFixture<WeatherStationTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherStationTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStationTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
