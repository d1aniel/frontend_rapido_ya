import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

import { ActividadService } from '../../../services/actividad.service';
import { RecorridoService } from '../../../services/recorrido.service';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    hora_inicio: ['', Validators.required],
    duracion: ['', Validators.required],
    recorrido: ['', Validators.required]
  });

  recorridos: any[] = [];

  recorridoService = inject(RecorridoService);
  actividadService = inject(ActividadService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecorridos();
  }

  loadRecorridos(): void {
    this.recorridoService.getAll().subscribe({
      next: (data: any[]) => {
        this.recorridos = data.map(r => ({
          ...r,
          label: `Recorrido #${r.id} - Pedido ${r.pedido ?? 'sin pedido'}`,
          id: r.id
        }));
      },
      error: (err) => console.error('Error al cargar recorridos:', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const nuevaActividad = {
      descripcion: formValue.descripcion,
      hora_inicio: formValue.hora_inicio,
      duracion: formValue.duracion,
      recorrido: formValue.recorrido.id
    };

    this.actividadService.create(nuevaActividad).subscribe({
      next: () => this.router.navigateByUrl('/actividades'),
      error: (err) => console.error('Error al crear actividad:', err)
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/actividades');
  }

  // Getters
  get descripcion() { return this.form.get('descripcion'); }
  get hora_inicio() { return this.form.get('hora_inicio'); }
  get duracion() { return this.form.get('duracion'); }
  get recorridoField() { return this.form.get('recorrido'); }
}
