import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarpedidoComponent } from './mostrarpedido.component';

describe('MostrarpedidoComponent', () => {
  let component: MostrarpedidoComponent;
  let fixture: ComponentFixture<MostrarpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarpedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
