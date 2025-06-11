import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarrepartidoresComponent } from './eliminarrepartidores.component';

describe('EliminarrepartidoresComponent', () => {
  let component: EliminarrepartidoresComponent;
  let fixture: ComponentFixture<EliminarrepartidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarrepartidoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarrepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
