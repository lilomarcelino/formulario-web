import { Injectable } from '@angular/core';
import { Formulario } from '../model/formulario.model';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { FORMULARIO_API } from '../util/api.model';

@Injectable({
  providedIn: 'root',
})
export class FormularioService extends GenericService<Formulario> {
  constructor(http: HttpClient) {
    super(http, 'formulario');
  }

  totalRespostas(idFormulario: number, idUsuario: number): Promise<number> {
    return this.http
      .get<number>(
        `${FORMULARIO_API}/formulario/totalRespostas/${idFormulario}/${idUsuario}`
      )
      .toPromise();
  }
}
