import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { DetallePedidoService } from '../../../services/pedido-producto-servicio.service';
import { PedidoService } from '../../../services/pedido.service';
import { ProductoServicioService } from '../../../services/pedido-producto.service';

@Component({
  selector: 'app-actualizar-producto-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './actualizar-productos-servicios.component.html',
  styleUrls: ['./actualizar-productos-servicios.component.css']
})
export class ActualizarProductoServicioComponent implements OnInit {

  public form!: FormGroup;
  public pedidos: any[] = [];
  public productosServicios: any[] = [];

  // ✅ ID del detalle que vamos a actualizar
  public detalleId!: number;

  detallePedidoService = inject(DetallePedidoService);
  pedidoService = inject(PedidoService);
  productoServicioService = inject(ProductoServicioService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ Guardamos el id del detalle en una propiedad
    this.detalleId = +this.route.snapshot.params['id'];

    this.form = this.fb.group({
      pedido: [null, Validators.required],
      id_producto_servicio: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio_unitario: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });

    Promise.all([this.loadPedidos(), this.loadProductosServicios()])
      .then(() => this.getDetalle(this.detalleId));

    this.form.get('id_producto_servicio')?.valueChanges.subscribe(ps => {
      if (ps && ps.precio) {
        this.form.patchValue({ precio_unitario: ps.precio });
      } else {
        this.form.patchValue({ precio_unitario: '' });
      }
    });
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

  loadProductosServicios(): Promise<void> {
    return new Promise(resolve => {
      this.productoServicioService.getAll().subscribe(data => {
        this.productosServicios = data.map((ps: any) => ({
          ...ps,
          label: `${ps.nombre} - $${ps.precio}`,
          value: ps
        }));
        resolve();
      });
    });
  }

  getDetalle(id: number) {
    this.detallePedidoService.getOne(id).subscribe({
      next: (detalle) => {
        const pedidoObj = this.pedidos.find(p => p.id === detalle.pedido);
        const productoObj = this.productosServicios.find(ps => ps.id === detalle.producto);

        this.form.patchValue({
          pedido: pedidoObj,
          id_producto_servicio: productoObj,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario
        });
      },
      error: (err) => {
        console.error('Error al cargar detalle:', err);
      }
    });
  }

onSubmit(): void {
  console.log('Formulario:', this.form.value);
  console.log('¿Es válido?', this.form.valid);

  if (this.form.invalid) {
    console.warn('Formulario inválido. Corrija los errores.');
    return;
  }

  const formValue = this.form.value;

  const detalleActualizado = {
    pedido: formValue.pedido?.id || formValue.pedido,
    id_producto_servicio: formValue.id_producto_servicio?.id || formValue.id_producto_servicio,
    cantidad: formValue.cantidad,
    precio_unitario: formValue.precio_unitario
  };

  // ✅ Extraemos el ID directamente desde la ruta
  const detalleId = +this.route.snapshot.params['id'];

  if (!detalleId) {
    console.error('ID de detalle no encontrado en la ruta');
    return;
  }

  this.detallePedidoService.update(detalleId, detalleActualizado).subscribe({
    next: () => {
      console.log('Actualización exitosa');
      this.router.navigate(['/pedidos', detalleActualizado.pedido, 'mostrar-productos-servicios']);
    },
    error: (err) => {
      console.error('Error al actualizar detalle:', err);
    }
  });
}

  cancel(): void {
    const pedido = this.form.get('pedido')?.value;
    const id = typeof pedido === 'object' ? pedido?.id : pedido;
    this.router.navigate(['/pedidos', id ?? '', 'mostrar-productos-servicios']);
  }
}
