import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorReadingComponent } from './sensor-reading.component';

describe('SensorReadingComponent', () => {
  let component: SensorReadingComponent;
  let fixture: ComponentFixture<SensorReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorReadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
