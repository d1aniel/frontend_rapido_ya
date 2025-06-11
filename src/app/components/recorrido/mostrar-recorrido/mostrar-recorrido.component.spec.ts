import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRecorridoComponent } from './mostrar-recorrido.component';

describe('MostrarRecorridoComponent', () => {
  let component: MostrarRecorridoComponent;
  let fixture: ComponentFixture<MostrarRecorridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRecorridoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
