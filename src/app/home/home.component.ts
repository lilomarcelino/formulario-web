import { Component, OnInit } from '@angular/core';
import { FormularioPerguntaAlternativa } from '../model/formulario-pergunta-alternativa.model';
import { FormularioPerguntaResposta } from '../model/formulario-pergunta-resposta.model';
import { FormularioPergunta } from '../model/formulario-pergunta.model';
import { Formulario } from '../model/formulario.model';
import { AuthService } from '../service/auth.service';
import { FormularioService } from '../service/formulario.service';
import { UtilService } from '../service/util.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

declare const jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public config = this.utilService.retornaConfigPaginacao(
    'formularioResponderConsulta'
  );

  formularios: Array<Formulario>;

  formulario: Formulario;
  formularioPerguntaResposta: FormularioPerguntaResposta;
  resposta: any;

  constructor(
    public utilService: UtilService,
    private authService: AuthService,
    private formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar(): void {
    const formularioParam = {
      size: this.config.itemsPerPage,
      page: this.config.currentPage - 1,
      search: this.retornaFiltroFomulario(),
      sort: 'nome,asc',
    };

    this.formularioService
      .buscarTodos(formularioParam)
      .subscribe((response) => {
        this.config.totalItems = response.totalElements;
        this.formularios = response.content;
      });
  }

  retornaFiltroFomulario(): string {
    const usuario = this.authService.getUsuario();

    return `pessoa.curso.id:${usuario.pessoa.curso.id},pessoa.id:notin[${
      usuario.pessoa.id
    }],dataFim>${moment()
      .format(this.utilService.DD_MM_YYYY_HH_MM_SS)},ativo:${true}`;
  }

  temFormularios(): boolean {
    return this.formularios && this.formularios.length > 0;
  }

  async formularioJaRespondido(formulario: Formulario): Promise<any> {
    const usuario = this.authService.getUsuario();

    return await this.formularioService.totalRespostas(
      formulario.id,
      usuario.pessoa.id
    );
  }

  async responderPergunta(formulario: Formulario): Promise<void> {
    await this.formularioJaRespondido(formulario).then((total) => {
      if (total == 0) {
        this.formulario = formulario;
        this.resposta = new FormularioPerguntaResposta();

        setTimeout(() => {
          jQuery('#modal-resposta').modal('show');
        }, 100);
      } else {
        this.utilService.mostrarMensagemAlerta('Formulario já respondido!');
      }
    });
  }

  fecharModal(): void {
    this.formulario = null;

    setTimeout(() => {
      jQuery('#modal-resposta').modal('hide');
    }, 100);
  }

  responderSimples(pergunta: FormularioPergunta): void {
    if (pergunta.resposta) {
      const respostaInserida = this.temRespostaInserida(pergunta);
      if (respostaInserida) return;

      Swal.fire({
        title: 'Deseja realmente incluir a resposta ?',
        text: 'Esse processo não pode ser revertido (Revise se precisar) !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.resposta = new FormularioPerguntaResposta();

          this.resposta.descricao = pergunta.resposta;
          this.resposta.situacao = 'RESPONDIDA';
          this.resposta.pessoa = this.authService.getUsuario().pessoa;

          pergunta.respostas.push(this.resposta);
        }
      });
    } else {
      this.utilService.mostrarMensagemAlerta('Informe a resposta !');
    }
  }

  responderAlternativa(
    alternativa: FormularioPerguntaAlternativa,
    pergunta: FormularioPergunta
  ): void {
    this.resposta = new FormularioPerguntaResposta();

    this.resposta.descricao = alternativa.nome;
    this.resposta.situacao = 'RESPONDIDA';
    this.resposta.pessoa = this.authService.getUsuario().pessoa;

    const respostaInserida = this.temRespostaInserida(pergunta);
    if (respostaInserida) {
      const index = pergunta.respostas.indexOf(this.resposta);
      pergunta.respostas.splice(index, 1);
      pergunta.respostas.push(this.resposta);
    } else {
      pergunta.respostas.push(this.resposta);
    }
  }

  temRespostaInserida(pergunta: FormularioPergunta, id?: any): boolean {
    if (id) {
      const usuario = this.authService.getUsuario();
      return (
        pergunta.respostas.filter((respostaInserida) => {
          return (
            id == respostaInserida.descricao &&
            respostaInserida.pessoa.id == usuario.pessoa.id
          );
        }).length > 0
      );
    } else {
      return this.resposta && this.resposta.pessoa
        ? pergunta.respostas.filter((respostaInserida) => {
            return respostaInserida.pessoa.id == this.resposta.pessoa.id;
          }).length > 0
        : false;
    }
  }

  salvarRespostas(): void {
    this.formulario.perguntas = this.formulario.perguntas.map((pergunta) => {
      return {
        id: pergunta.id,
        nome: pergunta.nome,
        descricao: pergunta.descricao,
        tipo: pergunta.tipo,
        multiplaEscolha: pergunta.multiplaEscolha,
        alternativas: pergunta.alternativas,
        respostas: pergunta.respostas,
      };
    });

    this.formularioService.salvar(this.formulario).subscribe(() => {
      this.buscar();

      Swal.fire({
        title: 'Formulário respondido com sucesso!',
        icon: 'success',
      });

      setTimeout(() => {
        jQuery('#modal-resposta').modal('hide');
      });
    });
  }
}
