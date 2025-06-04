import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoProductoServicio } from '../models/pedido_producto_servicio';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/pedido_producto/detalles-pedido/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PedidoProductoServicio[]> {
    return this.http.get<PedidoProductoServicio[]>(this.base_path);
  }

  getOne(id: number): Observable<PedidoProductoServicio> {
    return this.http.get<PedidoProductoServicio>(`${this.base_path}${id}`);
  }

  create(data: any): Observable<PedidoProductoServicio> {
    return this.http.post<PedidoProductoServicio>(this.base_path, data);
  }

  update(id: number, data: any): Observable<PedidoProductoServicio> {
    return this.http.put<PedidoProductoServicio>(`${this.base_path}${id}`, data);
  }

  delete(id: number): Observable<PedidoProductoServicio> {
    return this.http.delete<PedidoProductoServicio>(`${this.base_path}${id}`);
  }
}
