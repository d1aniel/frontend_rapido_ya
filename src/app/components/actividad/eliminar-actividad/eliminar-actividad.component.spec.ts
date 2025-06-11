import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarActividadComponent } from './eliminar-actividad.component';

describe('EliminarActividadComponent', () => {
  let component: EliminarActividadComponent;
  let fixture: ComponentFixture<EliminarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarActividadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
