import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repartidor } from '../models/repartidor';

@Injectable({
  providedIn: 'root'
})
export class RepartidorService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/repartidor_vehiculo/repartidores/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Repartidor[]> {
    return this.http.get<Repartidor[]>(this.base_path);
  }

  getOne(id: number): Observable<Repartidor> {
    return this.http.get<Repartidor>(`${this.base_path}${id}`);
  }

  create(data: Repartidor): Observable<Repartidor> {
    return this.http.post<Repartidor>(this.base_path, data);
  }

 update(id: number, data: Repartidor): Observable<Repartidor> {
  return this.http.put<Repartidor>(`${this.base_path}${id}/`, data);
}

  delete(id: number): Observable<Repartidor> {
    return this.http.delete<Repartidor>(`${this.base_path}${id}`);
  }

getById(id: number): Observable<Repartidor> {
  return this.http.get<Repartidor>(`${this.base_path}${id}`);
}

}
