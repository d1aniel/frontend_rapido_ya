import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/clientes.service'; // tu servicio adaptado
import { Router } from '@angular/router';
import { ClienteI } from '../../../models/clientes'; // tu modelo adaptado
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent implements OnInit {

  public form: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
  });

  clienteService = inject(ClienteService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const formValue: ClienteI = this.form.value;
    this.clienteService.createCliente(formValue).subscribe(
      () => {
        this.router.navigateByUrl('/clientes');
      },
      err => {
        console.error('No se ha creado correctamente', err);
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/clientes');
  }

  // Getters opcionales si los necesitas
  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get telefono() { return this.form.get('telefono'); }
}
