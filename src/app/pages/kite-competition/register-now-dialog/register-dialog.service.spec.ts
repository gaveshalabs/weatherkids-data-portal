import { TestBed } from '@angular/core/testing';

import { RegisterNowService } from './register-dialog.service';

describe('RegisterNowService', () => {
  let service: RegisterNowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterNowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
