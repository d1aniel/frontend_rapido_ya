import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoServicioComponent } from './agregar-producto-servicio.component';

describe('AgregarProductoServicioComponent', () => {
  let component: AgregarProductoServicioComponent;
  let fixture: ComponentFixture<AgregarProductoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProductoServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarProductoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
