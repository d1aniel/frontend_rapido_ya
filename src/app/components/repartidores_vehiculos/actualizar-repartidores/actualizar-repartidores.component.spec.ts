import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRepartidoresComponent } from './actualizar-repartidores.component';

describe('ActualizarRepartidoresComponent', () => {
  let component: ActualizarRepartidoresComponent;
  let fixture: ComponentFixture<ActualizarRepartidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRepartidoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
