import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/actividad_recorrido/actividades/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.base_path);
  }

  getOne(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.base_path}${id}`);
  }

  create(data: any): Observable<Actividad> {
    return this.http.post<Actividad>(this.base_path, data);
  }

  update(id: number, data: any): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.base_path}${id}/`, data);
  }

  delete(id: number): Observable<Actividad> {
    return this.http.delete<Actividad>(`${this.base_path}${id}`);
  }
}
