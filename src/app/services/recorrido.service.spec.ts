import { TestBed } from '@angular/core/testing';

import { RecorridoService } from './recorrido.service';

describe('RecorridoService', () => {
  let service: RecorridoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecorridoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
