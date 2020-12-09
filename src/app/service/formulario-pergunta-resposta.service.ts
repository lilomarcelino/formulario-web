import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormularioPerguntaResposta } from '../model/formulario-pergunta-resposta.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class FormularioPerguntaRespostaService extends GenericService<
  FormularioPerguntaResposta
> {
  constructor(http: HttpClient) {
    super(http, 'formulario-pergunta-resposta');
  }
}
