import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './util.service';
import { LoginService } from './login.service';
import { Login } from '../model/login.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login: Login;
  mostrarConteudoEmitter = new EventEmitter<string>();

  constructor(
    private router: Router,
    private utilService: UtilService,
    private loginService: LoginService
  ) {}

  fazerLogin(login: Login): void {
    this.loginService
      .login(login)
      .then((response) => {
        this.utilService.mostrarMensagemSucesso('Usuário Logado');

        this.login = response;

        localStorage.setItem(
          'isLogadoFormularioUnibave',
          JSON.stringify(response)
        );

        this.router.navigate(['/']);
      })
      .catch((error) => {
        if (error && error.error) {
          this.utilService.mostrarMensagemErro(error.error.message);
        } else {
          this.utilService.mostrarMensagemErro('Algo inesperado aconteceu');
        }
      });
  }

  fazerLogout(): void {
    this.navegarParaLogin();
    localStorage.clear();
  }

  navegarParaLogin(): void {
    this.router.navigate(['/login']);
  }

  public getAuthToken(): boolean {
    return localStorage.getItem('isLogadoFormularioUnibave') != null
      ? true
      : false;
  }

  public isLoggedIn(): boolean {
    return this.getAuthToken();
  }

  public getUsuario(): Usuario {
    return JSON.parse(localStorage.getItem('isLogadoFormularioUnibave'));
  }
}
