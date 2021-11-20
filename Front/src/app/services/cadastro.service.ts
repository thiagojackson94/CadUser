import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CadUsuarioRequest } from '../domain/cadUsuario-request';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  salvarNovoUsuario(usuario: CadUsuarioRequest): Promise<any> {
    return this.http
      .post<any>(`${environment.API}/api/Usuarios/create`, usuario)
      .toPromise();
  }

  getListaUsuarios(): Promise<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${environment.API}/api/Usuarios/getAll`)
      .toPromise();
  }

  editarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(
      `${environment.API}/api/Usuarios/update/` + id,
      usuario
    );
  }

  excluirUsuario(id: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.API}/api/Usuarios/delete/` + id
    );
  }
}
