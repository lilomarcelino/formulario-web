import { BaseModel } from './base.model';
import { FormularioPerguntaAlternativa } from './formulario-pergunta-alternativa.model';
import { FormularioPerguntaResposta } from './formulario-pergunta-resposta.model';

export class FormularioPergunta extends BaseModel {
  nome: string;
  descricao: string;
  tipo: string;
  multiplaEscolha: boolean;
  alternativas: Array<FormularioPerguntaAlternativa>;
  respostas: Array<FormularioPerguntaResposta>;
  resposta?: string;

  constructor() {
    super();
    this.tipo = 'SIMPLES';
    this.multiplaEscolha = false;
    this.alternativas = new Array<FormularioPerguntaAlternativa>();
  }
}
