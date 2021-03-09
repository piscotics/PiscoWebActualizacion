import { TestBed } from '@angular/core/testing';

import { EnviarsmsService } from './enviarsms.service';

describe('EnviarsmsService', () => {
  let service: EnviarsmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarsmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
