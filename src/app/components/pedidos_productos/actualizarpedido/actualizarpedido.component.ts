import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { ClienteService } from '../../../services/clientes.service';
import { RepartidorService } from '../../../services/repartidor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pedido } from '../../../models/pedido';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-actualizar-pedido',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './actualizarpedido.component.html',
  styleUrls: ['./actualizarpedido.component.css']
})
export class ActualizarPedidoComponent implements OnInit {

  public form: FormGroup;
  public clientes: any[] = [];
  public repartidoresVehiculos: any[] = [];
  pedidoId: number = 0;

  pedidoService = inject(PedidoService);
  clienteService = inject(ClienteService);
  repartidorVehiculoService = inject(RepartidorService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      direccion_entrega: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cliente: [null, [Validators.required]],
      repartidor_vehiculo: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Obtener el ID desde la ruta
    this.activatedRoute.params.subscribe(params => {
      this.pedidoId = +params['id'];
      this.loadClientes();
      this.loadRepartidoresVehiculos();
      this.loadPedido();
    });
  }

  loadClientes(): void {
    this.clienteService.getAllCliente().subscribe({
      next: (data) => {
        this.clientes = data.map((cliente: any) => ({
          ...cliente,
          label: cliente.nombre ?? 'Sin nombre'
        }));
      },
      error: (err: any) => console.error('Error al cargar clientes:', err)
    });
  }

  loadRepartidoresVehiculos(): void {
    this.repartidorVehiculoService.getAll().subscribe({
      next: (data) => {
        this.repartidoresVehiculos = data.map((r: any) => ({
          ...r,
          label: `${r.nombre ?? 'Sin nombre'} - ${r.vehiculo?.tipo ?? 'Sin placa'}`,
          id: r.id
        }));
      },
      error: (err: any) => console.error('Error al cargar repartidores:', err)
    });
  }

  loadPedido(): void {
    this.pedidoService.getOne(this.pedidoId).subscribe({
      next: (pedido: Pedido) => {
        const [fecha, horaCompleta] = pedido.fecha_hora.split('T');
        const hora = horaCompleta ? horaCompleta.slice(0, 5) : '';

        const clienteSeleccionado = this.clientes.find(c => c.id === pedido.cliente);
        const repartidorSeleccionado = this.repartidoresVehiculos.find(r => r.id === pedido.repartidor);

        this.form.patchValue({
          fecha,
          hora,
          direccion_entrega: pedido.direccion_entrega,
          estado: pedido.estado,
          cliente: clienteSeleccionado ?? null,
          repartidor_vehiculo: repartidorSeleccionado ?? null
        });
      },
      error: (err: any) => {
        console.error('Error al cargar el pedido:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const fechaHora = `${formValue.fecha}T${formValue.hora}`;

    const pedidoActualizado: any = {
      fecha_hora: fechaHora,
      direccion_entrega: formValue.direccion_entrega,
      estado: formValue.estado,
      cliente: formValue.cliente.id,
      repartidor: formValue.repartidor_vehiculo.id
    };

    this.pedidoService.update(this.pedidoId, pedidoActualizado).subscribe({
      next: () => this.router.navigateByUrl('/pedidos'),
      error: (err: any) => console.error('Error al actualizar el pedido:', err)
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/pedidos');
  }

  // Getters para el form
  get fecha() { return this.form.get('fecha'); }
  get hora() { return this.form.get('hora'); }
  get direccion_entrega() { return this.form.get('direccion_entrega'); }
  get estado() { return this.form.get('estado'); }
  get cliente() { return this.form.get('cliente'); }
  get repartidor_vehiculo() { return this.form.get('repartidor_vehiculo'); }

}
