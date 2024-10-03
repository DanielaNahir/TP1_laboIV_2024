import { TestBed } from '@angular/core/testing';

import { AlertJuegosService } from './alert-juegos.service';

describe('AlertJuegosService', () => {
  let service: AlertJuegosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertJuegosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
