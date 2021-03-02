import { TestBed } from '@angular/core/testing';

import { LawDataService } from './law-data.service';

describe('LawDataService', () => {
  let service: LawDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
