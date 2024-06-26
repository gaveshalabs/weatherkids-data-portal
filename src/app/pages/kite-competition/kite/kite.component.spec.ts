import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiteComponent } from './kite.component';

describe('KiteComponent', () => {
    let component: KiteComponent;
    let fixture: ComponentFixture<KiteComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [KiteComponent],
        });
        fixture = TestBed.createComponent(KiteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
