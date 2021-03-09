import { TestBed } from '@angular/core/testing';

import { TitularesService } from './titulares.service';

describe('TitularesService', () => {
  let service: TitularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
