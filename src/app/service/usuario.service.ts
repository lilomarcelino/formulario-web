import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Usuario } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericService<Usuario> {
  constructor(http: HttpClient) {
    super(http, 'usuario');
  }
}
