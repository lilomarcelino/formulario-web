import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { GrupoAcesso } from '../model/grupo-acesso.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GrupoAcessoService extends GenericService<GrupoAcesso> {
  constructor(http: HttpClient) {
    super(http, 'grupo-acesso');
  }
}
