import { TestBed } from '@angular/core/testing';

import { DdServicesService } from './dd-services.service';

describe('DdServicesService', () => {
  let service: DdServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DdServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
