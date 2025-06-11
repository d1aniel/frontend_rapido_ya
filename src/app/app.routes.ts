import { Routes } from '@angular/router';
// clientes
import { MostrarClienteComponent } from './components/clientes/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/clientes/actualizar-cliente/actualizar-cliente.component';

//pedidos_productos
import { MostrarPedidoComponent } from './components/pedidos_productos/mostrarpedido/mostrarpedido.component';
import { CrearpedidoComponent } from './components/pedidos_productos/crearpedido/crearpedido.component';
import { ActualizarPedidoComponent } from './components/pedidos_productos/actualizarpedido/actualizarpedido.component';
import { MostrarPedidoProductoServiciosComponent } from './components/pedidos_productos/mostrar-productos-servicios/mostrar-productos-servicios.component';

// Repartidores
import { MostrarRepartidorComponent } from './components/repartidores_vehiculos/mostrar-repartidores/mostrar-repartidores.component';
import { CrearRepartidoresComponent } from './components/repartidores_vehiculos/crear-repartidores/crear-repartidores.component';
import { ActualizarRepartidoresComponent } from './components/repartidores_vehiculos/actualizar-repartidores/actualizar-repartidores.component';

//actividad-recorrido
import { ActividadRecorridoComponent } from './components/actividad-recorrido/mostrar/mostrar.component';

// Recorridos
import { MostrarRecorridosComponent } from './components/recorrido/mostrar-recorrido/mostrar-recorrido.component';
import { CrearRecorridoComponent } from './components/recorrido/crear-recorrido/crear-recorrido.component';
import { ActualizarRecorridoComponent } from './components/recorrido/actualizar-recorrido/actualizar-recorrido.component';

// Actividades
import { MostrarActividadComponent } from './components/actividad/mostrar-actividad/mostrar-actividad.component';
import { CrearActividadComponent } from './components/actividad/crear-actividad/crear-actividad.component';
import { ActualizarActividadComponent } from './components/actividad/actualizar-actividad/actualizar-actividad.component';


export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },

  // Clientes
  { path: 'clientes', component: MostrarClienteComponent },
  { path: 'clientes/nuevo', component: CrearClienteComponent },
  { path: 'clientes/edit/:id', component: ActualizarClienteComponent },

  // Pedidos
  { path: 'pedidos', component: MostrarPedidoComponent },
  { path: 'pedidos/nuevo', component: CrearpedidoComponent },
  { path: 'pedidos/:id', component: ActualizarPedidoComponent },
  {
    path: 'pedidos/:id/agregar-producto',
    loadComponent: () =>
      import('./components/pedidos_productos/agregar-producto/agregar-producto.component').then(
        (m) => m.AgregarProductoComponent
      )
  },
 {
  path: 'pedidos/:id/mostrar-productos-servicios',
  component: MostrarPedidoProductoServiciosComponent
},

  // Repartidores
  { path: 'repartidores', component: MostrarRepartidorComponent },
  { path: 'repartidores/nuevo', component: CrearRepartidoresComponent },
  { path: 'repartidores/edit/:id', component: ActualizarRepartidoresComponent },

  // Productos
  {
    path: 'productos',
    loadComponent: () =>
      import('./components/pedidos_productos/mostrar-productos/mostrar-productos.component').then(
        (m) => m.MostrarProductoComponent
      )
  },
  {
    path: 'productos/nuevo',
    loadComponent: () =>
      import('./components/pedidos_productos/agregar-producto/agregar-producto.component').then(
        (m) => m.AgregarProductoComponent
      )
  },
  {
    path: 'productos/edit/:id',
    loadComponent: () =>
      import('./components/pedidos_productos/actualizar-productos/actualizar-productos.component').then(
        (m) => m.ActualizarProductosComponent
      )
  },
  {
    path: 'productos/pedido/:pedidoId',
    loadComponent: () =>
      import('./components/pedidos_productos/mostrar-productos/mostrar-productos.component').then(
        (m) => m.MostrarProductoComponent
      )
  },
  {
    path: 'pedido-producto-servicio',
    loadComponent: () =>
      import('./components/pedidos_productos/mostrar-productos-servicios/mostrar-productos-servicios.component')
        .then((m) => m.MostrarPedidoProductoServiciosComponent)
  },
  {
    path: 'pedido-producto-servicio/nuevo/:id',
    loadComponent: () =>
      import('./components/pedidos_productos/agregar-producto-servicio/agregar-producto-servicio.component')
        .then((m) => m.CrearServicioComponent)
  },
  { 
    path: 'pedido-producto-servicio/edit/:id',
    loadComponent: () =>
      import('./components/pedidos_productos/actualizar-productos-servicios/actualizar-productos-servicios.component')
        .then((m) => m.ActualizarProductoServicioComponent)
  },

  // Página central de actividad y recorrido
  { path: 'actividad-recorrido', component: ActividadRecorridoComponent },

  // Recorridos
  { path: 'recorridos', component: MostrarRecorridosComponent },
  { path: 'recorridos/nuevo', component: CrearRecorridoComponent },
  { path: 'recorridos/edit/:id', component: ActualizarRecorridoComponent },

  // Actividades
  { path: 'actividades', component: MostrarActividadComponent },
  { path: 'actividades/nuevo', component: CrearActividadComponent },
  { path: 'actividades/edit/:id', component: ActualizarActividadComponent },


];
