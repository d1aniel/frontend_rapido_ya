import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteI } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/clientes/clientes/`; // ← nota la barra al final

  constructor(private http: HttpClient) { }

  getAllCliente(): Observable<ClienteI[]> {
    return this.http.get<ClienteI[]>(this.base_path); // → ya tiene barra final
  }

  getOneCliente(id: number): Observable<ClienteI> {
    return this.http.get<ClienteI>(`${this.base_path}${id}/`);
  }

  createCliente(data: any): Observable<ClienteI> {
    return this.http.post<ClienteI>(this.base_path, data); // correcto
  }

  updateCliente(id: number, data: any): Observable<ClienteI> {
    return this.http.put<ClienteI>(`${this.base_path}${id}/`, data);
  }

  deleteCliente(id: number): Observable<ClienteI> {
    return this.http.delete<ClienteI>(`${this.base_path}${id}/`);
  }
}
