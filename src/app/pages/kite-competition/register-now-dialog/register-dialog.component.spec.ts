import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNowComponent } from './register-dialog.component';

describe('RegisterNowComponent', () => {
    let component: RegisterNowComponent;
    let fixture: ComponentFixture<RegisterNowComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterNowComponent],
        });
        fixture = TestBed.createComponent(RegisterNowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
