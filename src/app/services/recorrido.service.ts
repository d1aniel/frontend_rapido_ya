import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recorrido } from '../models/recorrido';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/actividad_recorrido/recorridos/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Recorrido[]> {
    return this.http.get<Recorrido[]>(this.base_path);
  }

  getOne(id: number): Observable<Recorrido> {
    return this.http.get<Recorrido>(`${this.base_path}${id}`);
  }

  create(data: any): Observable<Recorrido> {
    return this.http.post<Recorrido>(this.base_path, data);
  }

  update(id: number, data: any): Observable<Recorrido> {
    return this.http.put<Recorrido>(`${this.base_path}${id}/`, data); // nota la barra final
  }

  delete(id: number): Observable<Recorrido> {
    return this.http.delete<Recorrido>(`${this.base_path}${id}`);
  }
}
