import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProductosServiciosComponent } from './mostrar-productos-servicios.component';

describe('MostrarProductosServiciosComponent', () => {
  let component: MostrarProductosServiciosComponent;
  let fixture: ComponentFixture<MostrarProductosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarProductosServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarProductosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
