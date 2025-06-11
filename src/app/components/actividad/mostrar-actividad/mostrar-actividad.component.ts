// src/app/components/actividad/mostrar-actividad/mostrar-actividad.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { Actividad } from '../../../models/actividad';
import { ActividadService } from '../../../services/actividad.service';

@Component({
  selector: 'app-mostrar-actividad',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    RouterModule
  ],
  templateUrl: './mostrar-actividad.component.html',
  styleUrls: ['./mostrar-actividad.component.css']
})
export class MostrarActividadComponent implements OnInit {
  public actividades: Actividad[] = [];

  constructor(
    private actividadService: ActividadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerActividades();
  }

  obtenerActividades(): void {
    this.actividadService.getAll().subscribe({
      next: (data) => {
        this.actividades = data;
      },
      error: (error) => {
        console.error('Error al obtener las actividades:', error);
      }
    });
  }

  eliminar(id: number): void {
    this.actividadService.delete(id).subscribe({
      next: () => {
        this.obtenerActividades();
      },
      error: (error) => {
        console.error('Error al eliminar la actividad:', error);
      }
    });
  }
}
