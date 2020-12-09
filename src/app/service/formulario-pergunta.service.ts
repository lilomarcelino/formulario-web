import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormularioPergunta } from '../model/formulario-pergunta.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class FormularioPerguntaService extends GenericService<
  FormularioPergunta
> {
  constructor(http: HttpClient) {
    super(http, 'formulario-pergunta');
  }
}
