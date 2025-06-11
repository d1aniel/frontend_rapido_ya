import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { PedidoProductoServicio } from '../../../models/pedido_producto_servicio';
import { DetallePedidoService } from '../../../services/pedido-producto-servicio.service';

@Component({
  selector: 'app-mostrar-pedidoproductosservicios',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    RouterModule,
    CurrencyPipe
  ],
  templateUrl: './mostrar-productos-servicios.component.html',
  styleUrl: './mostrar-productos-servicios.component.css'
})
export class MostrarPedidoProductoServiciosComponent implements OnInit {
  public detallesPedido: PedidoProductoServicio[] = [];
  public pedidoId: string | null = null;

  constructor(
    private detallePedidoService: DetallePedidoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pedidoId = this.route.snapshot.paramMap.get('id');

    if (this.pedidoId) {
      this.mostrarDetalles(this.pedidoId);
    } else {
      console.error('No se recibió el id del pedido');
    }
  }

  mostrarDetalles(idPedido: string): void {
    this.detallePedidoService.getByPedidoId(idPedido).subscribe({
      next: (data) => {
        this.detallesPedido = data;
      },
      error: (error) => {
        console.error('Error al obtener los detalles del pedido:', error);
      }
    });
  }

  eliminar(id: number): void {
    this.detallePedidoService.delete(id).subscribe(
      () => {
        if (this.pedidoId) {
          this.mostrarDetalles(this.pedidoId);
        }
      },
      error => {
        console.error('Error al eliminar el detalle del pedido:', error);
      }
    );
  }
}
