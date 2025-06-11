import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRecorridoComponent } from './eliminar-recorrido.component';

describe('EliminarRecorridoComponent', () => {
  let component: EliminarRecorridoComponent;
  let fixture: ComponentFixture<EliminarRecorridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarRecorridoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
