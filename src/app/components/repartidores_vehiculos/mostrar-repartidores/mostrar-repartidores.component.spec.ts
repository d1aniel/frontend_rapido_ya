import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRepartidoresComponent } from './mostrar-repartidores.component';

describe('MostrarRepartidoresComponent', () => {
  let component: MostrarRepartidoresComponent;
  let fixture: ComponentFixture<MostrarRepartidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRepartidoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
