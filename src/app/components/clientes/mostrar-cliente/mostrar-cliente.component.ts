import { Component, OnInit } from '@angular/core';
import { ClienteI } from '../../../models/clientes';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ClienteService } from '../../../services/clientes.service'; // nombre corregido según tu estructura

@Component({
  selector: 'app-mostrar-cliente',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-cliente.component.html',
  styleUrl: './mostrar-cliente.component.css'
})
export class MostrarClienteComponent implements OnInit {
  public clientes: ClienteI[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarClientes();
  }

  mostrarClientes(): void {
    this.clienteService.getAllCliente().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    });
  }

  eliminar(id: number): void {
    this.clienteService.deleteCliente(id).subscribe(
      () => {
        this.mostrarClientes(); // recarga la lista
      },
      error => {
        console.error('Error al eliminar el cliente:', error);
      }
    );
  }
}
