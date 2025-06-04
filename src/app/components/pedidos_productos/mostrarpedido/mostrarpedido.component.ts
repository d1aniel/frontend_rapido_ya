import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-mostrar-pedido',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule, CommonModule],
  templateUrl: './mostrarpedido.component.html',
  styleUrls: ['./mostrarpedido.component.css']

})
export class MostrarPedidoComponent implements OnInit {
  public pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarPedidos();
  }

mostrarPedidos(): void {
  this.pedidoService.getAll().subscribe({
    next: (data) => {
      this.pedidos = data;
      console.log('Pedidos procesados:', this.pedidos);
    },
    error: (error) => {
      console.error('Error al obtener los pedidos:', error);
    }
  });
}


  eliminar(id: number): void {
    this.pedidoService.delete(id).subscribe({
      next: () => {
        this.mostrarPedidos(); // recarga la lista después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar el pedido:', error);
      }
    });
  }
}
