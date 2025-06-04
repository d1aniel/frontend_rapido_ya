import { Routes } from '@angular/router';
import { MostrarClienteComponent } from './components/clientes/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/clientes/actualizar-cliente/actualizar-cliente.component';

import { MostrarPedidoComponent  } from './components/pedidos_productos/mostrarpedido/mostrarpedido.component';
import { CrearpedidoComponent } from './components/pedidos_productos/crearpedido/crearpedido.component';
import { ActualizarpedidoComponent } from './components/pedidos_productos/actualizarpedido/actualizarpedido.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/clientes', 
        pathMatch: 'full' 
    },
    // Rutas clientes
    {
        path: "clientes",
        component: MostrarClienteComponent
    },
    {
        path: "clientes/nuevo",
        component: CrearClienteComponent
    },
    {
        path: "clientes/edit/:id",
        component: ActualizarClienteComponent
    },
    // Rutas pedidos
    {
        path: "pedidos",
        component: MostrarPedidoComponent
    },
    {
        path: "pedidos/nuevo",
        component: CrearpedidoComponent
    },
    {
        path: "pedidos/:id",
        component: ActualizarpedidoComponent
    },
    {
  path: "pedidos/:id/agregar-producto",
  loadComponent: () => import('./components/pedidos_productos/agregar-producto/agregar-producto.component')
    .then(m => m.AgregarProductoComponent)
},
{
  path: "pedidos/:id/agregar-producto-servicio",
  loadComponent: () => import('./components/pedidos_productos/agregar-producto-servicio/agregar-producto-servicio.component')
    .then(m => m.AgregarProductoServicioComponent)
},
];
