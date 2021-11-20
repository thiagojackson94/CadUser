import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Escolaridade } from '../domain/escolaridade';

@Injectable({
  providedIn: 'root',
})
export class EscolaridadeService {
  constructor(private http: HttpClient) {}

  getListaEscolaridades(): Promise<Escolaridade[]> {
    return this.http
      .get<Escolaridade[]>(`${environment.API}/api/Escolaridade/getAll`)
      .toPromise();
  }
}
