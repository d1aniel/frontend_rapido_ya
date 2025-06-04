import { Routes } from '@angular/router';
import { MostrarClienteComponent } from './components/clientes/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/clientes/actualizar-cliente/actualizar-cliente.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/', 
        pathMatch: 'full' 
    },
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
];
