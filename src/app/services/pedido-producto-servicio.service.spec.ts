import { TestBed } from '@angular/core/testing';

import { PedidoProductoServicioService } from './pedido-producto-servicio.service';

describe('PedidoProductoServicioService', () => {
  let service: PedidoProductoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoProductoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
