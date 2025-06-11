import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProductosServiciosComponent } from './actualizar-productos-servicios.component';

describe('ActualizarProductosServiciosComponent', () => {
  let component: ActualizarProductosServiciosComponent;
  let fixture: ComponentFixture<ActualizarProductosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarProductosServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarProductosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
