import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../../../models/pedido_producto';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProductoServicioService } from '../../../services/pedido-producto.service';

@Component({
  selector: 'app-mostrar-producto',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule, CommonModule],
  templateUrl: './mostrar-productos.component.html',
  styleUrl: './mostrar-productos.component.css'
})
export class MostrarProductoComponent implements OnInit {
  public productos: ProductoServicio[] = [];

  constructor(
    private productoService: ProductoServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarProductos();
  }

  mostrarProductos(): void {
    this.productoService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  eliminar(id: number): void {
    this.productoService.delete(id).subscribe({
      next: () => {
        this.mostrarProductos(); // recarga la lista después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    });
  }
}
