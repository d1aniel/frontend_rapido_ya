import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { ClienteService } from '../../../services/clientes.service';
import { RepartidorService } from '../../../services/repartidor.service';
import { Router } from '@angular/router';
import { Pedido } from '../../../models/pedido';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-crear-pedido',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './crearpedido.component.html',
  styleUrls: ['./crearpedido.component.css']
})
export class CrearpedidoComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    hora: ['', [Validators.required]],
    direccion_entrega: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    repartidor_vehiculo: ['', [Validators.required]]
  });

  public clientes: any[] = [];
  public repartidoresVehiculos: any[] = [];

  pedidoService = inject(PedidoService);
  clienteService = inject(ClienteService);
  repartidorVehiculoService = inject(RepartidorService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadRepartidoresVehiculos();
  }

  loadClientes(): void {
  this.clienteService.getAllCliente().subscribe({
    next: (data) => {
      this.clientes = data.map((cliente: any) => ({
        ...cliente,
        label: cliente.nombre ?? 'Sin nombre'
      }));
    },
    error: (err) => console.error('Error al cargar clientes:', err)
  });
}

loadRepartidoresVehiculos(): void {
  this.repartidorVehiculoService.getAll().subscribe({
    next: (data) => {
      this.repartidoresVehiculos = data.map((r: any) => ({
      ...r,
      label: `${r.nombre ?? 'Sin nombre'} - ${r.vehiculo?.tipo ?? 'Sin placa'}`,
      id: r.id // asegúrate que tenga un ID aquí
      }));
    },
    error: (err) => console.error('Error al cargar repartidores:', err)
  });
}

 onSubmit(): void {
  if (this.form.invalid) return;

  const formValue = this.form.value;

  // Combinar fecha y hora en formato ISO
  const fechaHora = `${formValue.fecha}T${formValue.hora}`;

  const nuevoPedido: any = {
  fecha_hora: fechaHora,
  direccion_entrega: formValue.direccion_entrega,
  estado: formValue.estado,
  cliente: formValue.cliente.id,
  repartidor: formValue.repartidor_vehiculo.id // usa "repartidor" si ese es el campo correcto
};


  this.pedidoService.create(nuevoPedido).subscribe({
    next: () => this.router.navigateByUrl('/pedidos'),
    error: (err) => console.error('No se ha creado correctamente el pedido', err)
  });
}


  cancel(): void {
    this.router.navigateByUrl('/pedidos');
  }

  // Función para usar como label en el dropdown de repartidor_vehiculo
  customLabelRepartidor(repartidorVehiculo: any): string {
    return `${repartidorVehiculo?.repartidor?.nombre} - ${repartidorVehiculo?.vehiculo?.patente}`;
  }

  // Getters
  get fecha() { return this.form.get('fecha'); }
  get hora() { return this.form.get('hora'); }
  get direccion_entrega() { return this.form.get('direccion_entrega'); }
  get estado() { return this.form.get('estado'); }
  get cliente() { return this.form.get('cliente'); }
  get repartidor_vehiculo() { return this.form.get('repartidor_vehiculo'); }
}
