import { BaseModel } from './base.model';

export class FormularioPerguntaAlternativa extends BaseModel {
  nome: string;
  descricao: string;
  checked?: boolean;
}
