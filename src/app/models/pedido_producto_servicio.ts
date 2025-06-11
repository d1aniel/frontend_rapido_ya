export interface PedidoProductoServicio {
  id: number;
  pedido: number;
  cantidad: number;
  precio_unitario: number | string;
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number | string;
  };
  producto_id: number;
}
