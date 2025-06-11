import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRecorridoComponent } from './actualizar-recorrido.component';

describe('ActualizarRecorridoComponent', () => {
  let component: ActualizarRecorridoComponent;
  let fixture: ComponentFixture<ActualizarRecorridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRecorridoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
