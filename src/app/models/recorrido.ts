export interface Recorrido {
  id?: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  pedido: number;      // ID del pedido seleccionado
  repartidor: number;  // ID del repartidor seleccionado
}