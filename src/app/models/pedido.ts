export interface Pedido {
  id?: number;
  fecha_hora: string; // ISO string, por ejemplo: "2025-06-04T12:30:00"
  direccion_entrega: string;
  estado: string;
  cliente: number; // ID del cliente
  repartidor?: number | null; // ID del repartidor (puede ser null)
}