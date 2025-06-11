import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Repartidor } from '../../../models/repartidor';
import { RepartidorService } from '../../../services/repartidor.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mostrar-repartidor',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-repartidores.component.html',
  styleUrl: './mostrar-repartidores.component.css'
})
export class MostrarRepartidorComponent implements OnInit {
  public repartidores: Repartidor[] = [];

  constructor(
    private repartidorService: RepartidorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarRepartidores();
  }

  mostrarRepartidores(): void {
    this.repartidorService.getAll().subscribe({
      next: (data) => {
        this.repartidores = data;
      },
      error: (error) => {
        console.error('Error al obtener los repartidores:', error);
      }
    });
  }

  eliminar(id: number): void {
    this.repartidorService.delete(id).subscribe(
      () => {
        this.mostrarRepartidores(); // recargar lista
      },
      error => {
        console.error('Error al eliminar el repartidor:', error);
      }
    );
  }
}
