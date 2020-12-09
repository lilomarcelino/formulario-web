import { BaseModel } from './base.model';
import { Pessoa } from './pessoa.model';
import { GrupoAcesso } from './grupo-acesso.model';

export class Usuario extends BaseModel {
  login: string;
  senha: string;
  ativo: boolean;
  pessoa: Pessoa;
  grupos: Array<GrupoAcesso>;

  constructor() {
    super();
    this.ativo = true;
  }
}
