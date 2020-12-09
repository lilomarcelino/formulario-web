import { BaseModel } from './base.model';
import { Pessoa } from './pessoa.model';

export class FormularioPerguntaResposta extends BaseModel {
  descricao: string;
  situacao: string;
  pessoa: Pessoa;
  formularioPergunta?: any;
}
