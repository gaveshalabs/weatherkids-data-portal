import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPlayerComponent } from './best-player.component';

describe('BestPlayerComponent', () => {
  let component: BestPlayerComponent;
  let fixture: ComponentFixture<BestPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestPlayerComponent]
    });
    fixture = TestBed.createComponent(BestPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
