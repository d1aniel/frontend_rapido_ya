import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarpedidoComponent } from './actualizarpedido.component';

describe('ActualizarpedidoComponent', () => {
  let component: ActualizarpedidoComponent;
  let fixture: ComponentFixture<ActualizarpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarpedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
