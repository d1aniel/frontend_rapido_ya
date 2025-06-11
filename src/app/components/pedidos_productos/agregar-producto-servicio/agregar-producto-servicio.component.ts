import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

import { DetallePedidoService } from '../../../services/pedido-producto-servicio.service';
import { PedidoService } from '../../../services/pedido.service';
import { ProductoServicioService } from '../../../services/pedido-producto.service';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './agregar-producto-servicio.component.html',
  styleUrls: ['./agregar-producto-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  public form: FormGroup;
  public pedidos: any[] = [];
  public productosServicios: any[] = [];
  public id!: number;

  detallePedidoService = inject(DetallePedidoService);
  pedidoService = inject(PedidoService);
  productoServicioService = inject(ProductoServicioService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      pedido: [null, Validators.required],
      id_producto_servicio: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio_unitario: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    console.log('ID recibido desde la URL:', this.id);

    if (!this.id) {
      console.error('ID no definido en la ruta. No se puede continuar.');
      return;
    }

    this.loadPedidos();
    this.loadProductosServicios();

    this.form.get('id_producto_servicio')?.valueChanges.subscribe(ps => {
      if (ps && ps.precio) {
        this.form.patchValue({ precio_unitario: ps.precio });
      } else {
        this.form.patchValue({ precio_unitario: '' });
      }
    });
  }

  loadPedidos() {
    this.pedidoService.getAll().subscribe(data => {
      this.pedidos = data.map((p: any) => ({
        ...p,
        label: `Pedido #${p.id} - ${p.cliente?.nombre ?? 'Cliente'}`
      }));

      // Si el ID viene en la URL, seleccionarlo automáticamente
      const pedidoEncontrado = this.pedidos.find(p => p.id === this.id);
      if (pedidoEncontrado) {
        this.form.patchValue({ pedido: pedidoEncontrado });
      }
    });
  }

  loadProductosServicios() {
    this.productoServicioService.getAll().subscribe(data => {
      this.productosServicios = data.map((ps: any) => ({
        ...ps,
        label: `${ps.nombre} - $${ps.precio}`
      }));
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const nuevoDetalle = {
      pedido: formValue.pedido.id,
      id_producto_servicio: formValue.id_producto_servicio.id,
      cantidad: formValue.cantidad,
      precio_unitario: formValue.precio_unitario
    };

    this.detallePedidoService.create(nuevoDetalle).subscribe(
      () => this.router.navigate(['/pedidos', formValue.pedido.id, 'mostrar-productos-servicios']),
      err => console.error('Error al crear detalle pedido:', err)
    );
  }

  cancel(): void {
    const pedido = this.form.get('pedido')?.value;
    if (pedido?.id) {
      this.router.navigate(['/pedidos', pedido.id, 'mostrar-productos-servicios']);
    } else {
      this.router.navigate(['/pedidos']);
    }
  }

  agregarProductoServicio(pedido: any): void {
    if (pedido?.id) {
      this.router.navigate(['/pedidos', pedido.id, 'agregar-producto-servicio']);
    } else {
      console.error('Pedido inválido. No se puede agregar otro producto/servicio.');
    }
  }
}
