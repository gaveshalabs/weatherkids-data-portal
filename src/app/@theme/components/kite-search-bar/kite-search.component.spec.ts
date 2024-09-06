import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { KiteSearchComponent } from './kite-search.component';

describe('WeatherStationSearchComponent', () => {
    let component: KiteSearchComponent;
    let fixture: ComponentFixture<KiteSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ KiteSearchComponent ],
            imports: [
                FormsModule,
                MatAutocompleteModule,
                MatIconModule,
                MatInputModule,
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(KiteSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
