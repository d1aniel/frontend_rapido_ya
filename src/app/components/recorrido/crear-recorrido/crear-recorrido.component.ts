import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecorridoService } from '../../../services/recorrido.service';
import { PedidoService } from '../../../services/pedido.service';
import { RepartidorService } from '../../../services/repartidor.service';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-crear-recorrido',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './crear-recorrido.component.html',
  styleUrls: ['./crear-recorrido.component.css']
})
export class CrearRecorridoComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    fecha: ['', Validators.required],
    hora_inicio: ['', Validators.required],
    hora_fin: ['', Validators.required],
    pedido: ['', Validators.required],
    repartidores: [[], Validators.required]
  });

  pedidos: any[] = [];
  repartidores: any[] = [];

  pedidoService = inject(PedidoService);
  recorridoService = inject(RecorridoService);
  repartidorService = inject(RepartidorService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPedidos();
    this.loadRepartidores();
  }

  loadPedidos(): void {
    this.pedidoService.getAll().subscribe({
      next: (data: any[]) => {
        this.pedidos = data.map(p => ({
          ...p,
          label: `Pedido #${p.id} - ${p.direccion_entrega ?? 'Sin dirección'}`,
          id: p.id
        }));
      },
      error: (err: any) => console.error('Error al cargar pedidos:', err)
    });
  }

  loadRepartidores(): void {
    this.repartidorService.getAll().subscribe({
      next: (data: any[]) => {
        this.repartidores = data.map(r => ({
          ...r,
          label: r.nombre ?? 'Sin nombre',
          id: r.id
        }));
      },
      error: (err: any) => console.error('Error al cargar repartidores:', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const nuevoRecorrido = {
      fecha: formValue.fecha,
      hora_inicio: formValue.hora_inicio,
      hora_fin: formValue.hora_fin,
      pedido: formValue.pedido.id,
      repartidores: formValue.repartidores.map((r: any) => r.id)
    };

    this.recorridoService.create(nuevoRecorrido).subscribe({
      next: () => this.router.navigateByUrl('/recorridos'),
      error: (err) => console.error('Error al crear recorrido:', err)
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/recorridos');
  }

  // Getters para usar en el HTML
  get fecha() { return this.form.get('fecha'); }
  get hora_inicio() { return this.form.get('hora_inicio'); }
  get hora_fin() { return this.form.get('hora_fin'); }
  get pedido() { return this.form.get('pedido'); }
  get repartidoresField() { return this.form.get('repartidores'); }
}
