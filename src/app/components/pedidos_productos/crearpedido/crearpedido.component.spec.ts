import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpedidoComponent } from './crearpedido.component';

describe('CrearpedidoComponent', () => {
  let component: CrearpedidoComponent;
  let fixture: ComponentFixture<CrearpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearpedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
