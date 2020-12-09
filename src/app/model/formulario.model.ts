import { BaseModel } from './base.model';
import { Pessoa } from './pessoa.model';

export class Formulario extends BaseModel {
  nome: string;
  descricao: string;
  situacao: string;
  pessoa: Pessoa;
  dataInicio: any;
  dataFim: any;
  ativo: boolean;
  perguntas: Array<any>;

  constructor() {
    super();
    this.ativo = true;
  }
}
