import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoServicioService } from '../../../services/pedido-producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../../models/productos';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule,],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]],
  });

  productoService = inject(ProductoServicioService);

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
  const formValue: Producto = this.form.value;  // Asegúrate que ProductoServicio es el tipo correcto
  this.productoService.create(formValue).subscribe(
    () => {
      this.router.navigateByUrl('/productos');
    },
    (err: any) => {
      console.error('No se ha creado correctamente', err);
    }
  );
}


  cancel() {
    this.router.navigateByUrl('/productos');
  }

  // Getters opcionales
  get nombre() {
    return this.form.get('nombre');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get precio() {
    return this.form.get('precio');
  }
}
