import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataValueCardComponent } from './data-value-card.component';

describe('DataValueCardComponent', () => {
  let component: DataValueCardComponent;
  let fixture: ComponentFixture<DataValueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataValueCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataValueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
