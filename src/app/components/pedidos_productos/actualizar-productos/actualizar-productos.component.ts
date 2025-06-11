import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoServicioService } from '../../../services/pedido-producto.service';
import { ProductoServicio } from '../../../models/pedido_producto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-productos.component.html',
  styleUrls: ['./actualizar-productos.component.css']
})
export class ActualizarProductosComponent implements OnInit {
  public id: number = 0;

  public form: FormGroup = this.formBuilder.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', [Validators.required, Validators.min(0)]]
  });

  productoService = inject(ProductoServicioService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProducto(this.id);
  }

  getProducto(id: number) {
    this.productoService.getOne(id).subscribe({
      next: (data) => {
        this.form.setValue(data);
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
      }
    });
  }

onSubmit(): void {
  console.log('Formulario enviado', this.form.value); // depuración

  if (this.form.invalid) {
    console.warn('Formulario inválido');
    return;
  }

  const formValue: ProductoServicio = this.form.value;
  const id: number = this.form.value.id;
  this.productoService.update(id, formValue).subscribe(
    () => {
      this.router.navigateByUrl('/productos');
    },
    err => {
      console.error('Error al actualizar el producto:', err);
    }
  );
}

cancel(): void {
  this.router.navigateByUrl('/productos');
}


  get nombre() { return this.form.get('nombre'); }
  get descripcion() { return this.form.get('descripcion'); }
  get precio() { return this.form.get('precio'); }
}
