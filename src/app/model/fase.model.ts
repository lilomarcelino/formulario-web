import { BaseModel } from './base.model';

export class Fase extends BaseModel {
  nome: string;
  ativo: boolean;

  constructor() {
    super();
    this.ativo = true;
  }
}
