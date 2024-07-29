import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiteCompetitionMapComponent } from './kite-map.component';

describe('KiteCompetitionMapComponent', () => {
    let component: KiteCompetitionMapComponent;
    let fixture: ComponentFixture<KiteCompetitionMapComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [KiteCompetitionMapComponent],
        });
        fixture = TestBed.createComponent(KiteCompetitionMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
