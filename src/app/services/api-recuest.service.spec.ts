import { TestBed } from '@angular/core/testing';

import { ApiRecuestService } from './api-recuest.service';

describe('ApiRecuestService', () => {
  let service: ApiRecuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRecuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
