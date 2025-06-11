import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RepartidorService } from '../../../services/repartidor.service';
import { Repartidor } from '../../../models/repartidor';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-repartidores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-repartidores.component.html',
  styleUrl: './actualizar-repartidores.component.css'
})
export class ActualizarRepartidoresComponent implements OnInit {
  public id: number = 0;

  public form: FormGroup = this.fb.group({
  id: [''], // si quieres manejar el id en el formulario
  nombre: ['', [Validators.required]],
  telefono: ['', [Validators.required]],
  vehiculo: this.fb.group({
    tipo: ['', Validators.required],
    placa: ['', Validators.required],
    modelo: ['', Validators.required],
    marca: ['', Validators.required]
  })
});

  repartidorService = inject(RepartidorService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getRepartidor(this.id);
  }

  getRepartidor(id: number): void {
    this.repartidorService.getOne(id).subscribe({
      next: (data: Repartidor) => {
        this.form.setValue(data);
      },
      error: (err) => {
        console.error('Error al obtener el repartidor:', err);
      }
    });
  }

  onSubmit(): void {
    const formValue: Repartidor = this.form.value;
    const id: number = this.form.value.id;

    this.repartidorService.update(id, formValue).subscribe(
      () => {
        this.router.navigateByUrl('/repartidores');
      },
      err => {
        console.error('Error al actualizar el repartidor:', err);
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/repartidores');
  }

  // Getters útiles
  get nombre() { return this.form.get('nombre'); }
  get telefono() { return this.form.get('telefono'); }
  get vehiculo() { return this.form.get('vehiculo') as FormGroup; }
  get tipo() { return this.vehiculo.get('tipo'); }
  get placa() { return this.vehiculo.get('placa'); }
  get modelo() { return this.vehiculo.get('modelo'); }
  get marca() { return this.vehiculo.get('marca'); }
}
