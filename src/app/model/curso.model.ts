import { BaseModel } from './base.model';

export class Curso extends BaseModel {
  nome: string;
  ativo: boolean;

  constructor() {
    super();
    this.ativo = true;
  }
}
