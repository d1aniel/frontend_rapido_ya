import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/pedido_producto/pedidos/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.base_path);
  }

  getOne(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.base_path}${id}`);
  }

  create(data: any): Observable<Pedido> {
    return this.http.post<Pedido>(this.base_path, data);
  }

  update(id: number, data: any): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.base_path}${id}`, data);
  }

  delete(id: number): Observable<Pedido> {
    return this.http.delete<Pedido>(`${this.base_path}${id}`);
  }
}
