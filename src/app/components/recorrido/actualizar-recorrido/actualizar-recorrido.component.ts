import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

import { RecorridoService } from '../../../services/recorrido.service';
import { PedidoService } from '../../../services/pedido.service';
import { RepartidorService } from '../../../services/repartidor.service';

@Component({
  selector: 'app-actualizar-recorrido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, DropdownModule, MultiSelectModule],
  templateUrl: './actualizar-recorrido.component.html',
  styleUrls: ['./actualizar-recorrido.component.css']
})
export class ActualizarRecorridoComponent implements OnInit {

  public form!: FormGroup;
  public pedidos: any[] = [];
  public repartidores: any[] = [];
  public recorridoId!: number;

  recorridoService = inject(RecorridoService);
  pedidoService = inject(PedidoService);
  repartidorService = inject(RepartidorService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recorridoId = +this.route.snapshot.params['id'];

    this.form = this.fb.group({
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      pedido: [null, Validators.required],
      repartidores: [[], Validators.required]
    });

    Promise.all([this.loadPedidos(), this.loadRepartidores()])
      .then(() => this.getRecorrido(this.recorridoId));
  }

  loadPedidos(): Promise<void> {
    return new Promise(resolve => {
      this.pedidoService.getAll().subscribe(data => {
        this.pedidos = data.map((p: any) => ({
          ...p,
          label: `Pedido #${p.id} - ${p.cliente?.nombre ?? 'Cliente'}`,
          value: p
        }));
        resolve();
      });
    });
  }

  loadRepartidores(): Promise<void> {
    return new Promise(resolve => {
      this.repartidorService.getAll().subscribe(data => {
        this.repartidores = data.map((r: any) => ({
          ...r,
          label: `${r.nombre} ${r.apellido}`,
          value: r
        }));
        resolve();
      });
    });
  }

  getRecorrido(id: number) {
  this.recorridoService.getOne(id).subscribe({
    next: (recorrido) => {
      const pedidoObj = this.pedidos.find(p => p.id === recorrido.pedido);

      // ✅ Asegurarse de que siempre sea un array
      const repIds = Array.isArray(recorrido.repartidor)
        ? recorrido.repartidor
        : [recorrido.repartidor];

      const repartidoresSeleccionados = repIds
        .map((repId: number) => this.repartidores.find(r => r.id === repId))
        .filter(Boolean); // Elimina posibles undefined si no encuentra el id

      this.form.patchValue({
        fecha: recorrido.fecha,
        hora_inicio: recorrido.hora_inicio,
        hora_fin: recorrido.hora_fin,
        pedido: pedidoObj,
        repartidores: repartidoresSeleccionados
      });
    },
    error: (err) => {
      console.error('Error al cargar recorrido:', err);
    }
  });
}

onSubmit(): void {
  if (this.form.invalid) {
    console.warn('Formulario inválido. Corrija los errores.');
    return;
  }

  const formValue = this.form.value;

  const recorridoActualizado = {
    fecha: formValue.fecha,
    hora_inicio: formValue.hora_inicio,
    hora_fin: formValue.hora_fin,
    pedido: formValue.pedido?.id || formValue.pedido,
    repartidores: formValue.repartidores.map((r: any) => r?.id || r)
  };

  this.recorridoService.update(this.recorridoId, recorridoActualizado).subscribe({
    next: () => {
      console.log('Recorrido actualizado exitosamente');
      this.router.navigate(['/recorridos']); // ✅ Redirección corregida
    },
    error: (err) => {
      console.error('Error al actualizar recorrido:', err);
    }
  });
}

  cancel(): void {
    const pedido = this.form.get('pedido')?.value;
    const id = typeof pedido === 'object' ? pedido?.id : pedido;
    this.router.navigate(['/recorridos', id ?? '', 'mostrar']);
  }
}
