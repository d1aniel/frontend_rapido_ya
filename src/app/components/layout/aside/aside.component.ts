import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        routerLink: '/clientes'
      },
      {
        label: 'Pedido Producto',
        icon: 'pi pi-fw pi-truck',
        routerLink: '/pedido_producto'
      },
      {
        label: 'Actividad Recorrido',
        icon: 'pi pi-fw pi-map-marker',
        routerLink: '/actividad_recorrido'
      },
      {
        label: 'Repartidor Vehículo',
        icon: 'pi pi-fw pi-car',
        routerLink: '/repartidor_vehiculo'
      }
    ];
  }
}
