import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiteDashboardComponent } from './kite-dashboard.component';

describe('KiteDefaultComponent', () => {
    let component: KiteDashboardComponent;
    let fixture: ComponentFixture<KiteDashboardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [KiteDashboardComponent],
        });
        fixture = TestBed.createComponent(KiteDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
