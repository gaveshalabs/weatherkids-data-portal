import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { WeatherStationSearchComponent } from './weather-station-search.component';

describe('WeatherStationSearchComponent', () => {
  let component: WeatherStationSearchComponent;
  let fixture: ComponentFixture<WeatherStationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherStationSearchComponent ],
      imports: [
        FormsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatInputModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
