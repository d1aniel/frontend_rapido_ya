import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { ActividadService } from '../../../services/actividad.service';
import { RecorridoService } from '../../../services/recorrido.service';

@Component({
  selector: 'app-actualizar-actividad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './actualizar-actividad.component.html',
  styleUrls: ['./actualizar-actividad.component.css']
})
export class ActualizarActividadComponent implements OnInit {

  public form!: FormGroup;
  public recorridos: any[] = [];
  public actividadId!: number;

  actividadService = inject(ActividadService);
  recorridoService = inject(RecorridoService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actividadId = +this.route.snapshot.params['id'];

    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)]], // HH:mm:ss
      recorrido: [null, Validators.required]
    });

    this.loadRecorridos()
      .then(() => this.getActividad(this.actividadId));
  }

  loadRecorridos(): Promise<void> {
    return new Promise(resolve => {
      this.recorridoService.getAll().subscribe(data => {
        this.recorridos = data.map((r: any) => ({
          ...r,
          label: `Recorrido #${r.id} - Pedido ${r.pedido ?? 'sin pedido'}`,
          value: r
        }));
        resolve();
      });
    });
  }

  getActividad(id: number) {
    this.actividadService.getOne(id).subscribe({
      next: (actividad) => {
        const recorridoObj = this.recorridos.find(r => r.id === actividad.recorrido);

        this.form.patchValue({
          descripcion: actividad.descripcion,
          hora_inicio: actividad.hora_inicio,
          duracion: actividad.duracion,
          recorrido: recorridoObj || null
        });
      },
      error: (err) => {
        console.error('Error al cargar actividad:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.warn('Formulario inválido. Corrija los errores.');
      return;
    }

    const formValue = this.form.value;

    const actividadActualizada = {
      descripcion: formValue.descripcion,
      hora_inicio: formValue.hora_inicio,
      duracion: formValue.duracion,
      recorrido: formValue.recorrido?.id || formValue.recorrido
    };

    this.actividadService.update(this.actividadId, actividadActualizada).subscribe({
      next: () => {
        console.log('Actividad actualizada exitosamente');
        this.router.navigate(['/actividades']);
      },
      error: (err) => {
        console.error('Error al actualizar actividad:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/actividades']);
  }
}
