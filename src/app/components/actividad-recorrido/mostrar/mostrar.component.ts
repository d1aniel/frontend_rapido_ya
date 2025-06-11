import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-actividad-recorrido',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule],
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class ActividadRecorridoComponent {

  constructor(private router: Router) {}

  irARecorrido() {
    this.router.navigate(['/recorridos']);
  }

  irAActividad() {
    this.router.navigate(['/actividades']);
  }
}
