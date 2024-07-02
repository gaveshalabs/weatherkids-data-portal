import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiteLeaderboardComponent } from './leaderboard.component';

describe('KiteLeaderboardComponent', () => {
  let component: KiteLeaderboardComponent;
  let fixture: ComponentFixture<KiteLeaderboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KiteLeaderboardComponent]
    });
    fixture = TestBed.createComponent(KiteLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
