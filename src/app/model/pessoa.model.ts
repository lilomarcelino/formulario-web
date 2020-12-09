import { BaseModel } from './base.model';
import { Fase } from './fase.model';
import { Curso } from './curso.model';

export class Pessoa extends BaseModel {
  nome: string;
  cpf: string;
  codigoUniversidade: string;
  email: string;
  telefone: string;
  tipo: string;
  fase: Fase;
  curso: Curso;
  dataNascimento: any;
  ativo: boolean;

  constructor() {
    super();
    this.tipo = 'ADMIN';
    this.ativo = true;
  }
}
