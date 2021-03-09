import { TestBed } from '@angular/core/testing';

import { CambioclaveService } from './cambioclave.service';

describe('CambioclaveService', () => {
  let service: CambioclaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioclaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
