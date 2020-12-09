import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormularioPerguntaAlternativa } from '../model/formulario-pergunta-alternativa.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class FormularioPerguntaAlternativaService extends GenericService<
  FormularioPerguntaAlternativa
> {
  constructor(http: HttpClient) {
    super(http, 'formulario-pergunta-alternativa');
  }
}
