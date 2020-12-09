import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { FORMULARIO_API } from '../util/api.model';
import { Usuario } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(login: Login): Promise<Usuario> {
    return this.http
      .post<any>(`${FORMULARIO_API}/auth/login`, login)
      .toPromise();
  }
}
