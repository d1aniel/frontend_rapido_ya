import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { Recorrido } from '../../../models/recorrido';
import { RecorridoService } from '../../../services/recorrido.service';

@Component({
  selector: 'app-mostrar-recorridos',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    RouterModule
  ],
  templateUrl: './mostrar-recorrido.component.html',
  styleUrl: './mostrar-recorrido.component.css'
})
export class MostrarRecorridosComponent implements OnInit {
  public recorridos: Recorrido[] = [];

  constructor(
    private recorridoService: RecorridoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerRecorridos();
  }

  obtenerRecorridos(): void {
    this.recorridoService.getAll().subscribe({
      next: (data) => {
        this.recorridos = data;
      },
      error: (error) => {
        console.error('Error al obtener los recorridos:', error);
      }
    });
  }

  eliminar(id: number): void {
    this.recorridoService.delete(id).subscribe(
      () => {
        this.obtenerRecorridos(); // Refresca la lista después de eliminar
      },
      error => {
        console.error('Error al eliminar el recorrido:', error);
      }
    );
  }
}
