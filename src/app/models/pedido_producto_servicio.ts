export interface PedidoProductoServicio {
  id?: number;
  pedido: number; // ID del pedido
  producto_servicio: number; // ID del producto o servicio
  cantidad: number;
  precio_unitario: number;
}
