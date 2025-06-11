import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepartidorService } from '../../../services/repartidor.service'; // ajusta si tu ruta es diferente
import { Router } from '@angular/router';
import { Repartidor } from '../../../models/repartidor'; // tu modelo debe tener vehiculo
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-repartidor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-repartidores.component.html',
  styleUrl: './crear-repartidores.component.css'
})
export class CrearRepartidoresComponent implements OnInit {

  public form: FormGroup = this.fb.group({
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
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
  if (this.form.invalid) return;

  const formValue: Repartidor = this.form.value;

  this.repartidorService.create(formValue).subscribe({
    next: () => this.router.navigateByUrl('/repartidores'),
    error: (err) => console.error('No se ha creado correctamente', err)
  });
}


  cancel() {
    this.router.navigateByUrl('/repartidores');
  }

  // Getters opcionales si los necesitas
  get nombre() { return this.form.get('nombre'); }
  get telefono() { return this.form.get('telefono'); }
  get vehiculo() { return this.form.get('vehiculo'); }
}
