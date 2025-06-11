import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoServicio } from '../models/pedido_producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/pedido_producto/productos-servicios/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductoServicio[]> {
    return this.http.get<ProductoServicio[]>(this.base_path);
  }

  getOne(id: number): Observable<ProductoServicio> {
    return this.http.get<ProductoServicio>(`${this.base_path}${id}`);
  }

  create(data: any): Observable<ProductoServicio> {
    return this.http.post<ProductoServicio>(this.base_path, data);
  }

  update(id: number, data: any): Observable<ProductoServicio> {
  return this.http.put<ProductoServicio>(`${this.base_path}${id}/`, data);
  }

  delete(id: number): Observable<ProductoServicio> {
    return this.http.delete<ProductoServicio>(`${this.base_path}${id}`);
  }

}
