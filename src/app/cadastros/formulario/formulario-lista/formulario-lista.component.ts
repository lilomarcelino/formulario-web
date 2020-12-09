import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Formulario } from 'src/app/model/formulario.model';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/service/formulario.service';
import { UtilService } from 'src/app/service/util.service';
import Swal from 'sweetalert2';
import { FormularioPergunta } from 'src/app/model/formulario-pergunta.model';
import { FormularioPerguntaResposta } from 'src/app/model/formulario-pergunta-resposta.model';
import { FormularioPerguntaRespostaService } from 'src/app/service/formulario-pergunta-resposta.service';

declare const jQuery: any;

@Component({
  selector: 'app-formulario-lista',
  templateUrl: './formulario-lista.component.html',
  styleUrls: ['./formulario-lista.component.css'],
})
export class FormularioListaComponent implements OnInit {
  @Input() formularios: Array<Formulario>;
  @Input() config: PaginationInstance;
  @Output() buscarEmitter = new EventEmitter();

  perguntas: Array<FormularioPergunta>;

  data: any;

  constructor(
    private router: Router,
    private formularioService: FormularioService,
    private formularioPerguntaRespostaService: FormularioPerguntaRespostaService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  editar(id: number): void {
    this.router.navigate([`cadastros/formulario/${id}`]);
  }

  visualizarRespostas(perguntas: Array<FormularioPergunta>) {
    this.perguntas = perguntas;
    jQuery('#modal-pergunta-resposta').modal('show');
  }

  visualizarEstatisticas(perguntas: Array<FormularioPergunta>) {
    let data = this.retornaDataDashboard(perguntas);
    if (
      data.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0) > 0
    ) {
      this.data = {
        labels: ['Correta(s)', 'Meio Certo', 'Errada(s)', 'Respondida(s)'],
        datasets: [
          {
            label: 'My First Dataset',
            data: data,
            fill: true,
            backgroundColor: ['#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de'],
            borderColor: ['#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de'],
            borderWidth: 1,
          },
        ],
      };
      setTimeout(() => {
        jQuery('#modal-dashboard').modal('show');
      }, 100);
    } else {
      this.utilService.mostrarMensagemAlerta('Sem informações para analisar!');
    }
  }

  retornaDataDashboard(perguntas: Array<FormularioPergunta>): Array<any> {
    let correta = new Array();
    let contCorreta = 0;
    let meioCerto = new Array();
    let contMeioCerto = 0;
    let errado = new Array();
    let contErrada = 0;
    let respondido = new Array();
    let contRespondido = 0;

    perguntas.forEach((pergunta) => {
      pergunta.respostas.forEach((resposta) => {
        if (resposta.situacao == 'CORRETA') {
          correta.push(contCorreta == 0 ? (contCorreta = 1) : contCorreta++);
        }

        if (resposta.situacao == 'MEIO') {
          meioCerto.push(
            contMeioCerto == 0 ? (contMeioCerto = 1) : contMeioCerto++
          );
        }

        if (resposta.situacao == 'ERRADA') {
          errado.push(contErrada == 0 ? (contErrada = 1) : contErrada++);
        }

        if (resposta.situacao == 'RESPONDIDA') {
          respondido.push(
            contRespondido == 0 ? (contRespondido = 1) : contRespondido++
          );
        }
      });
    });

    let totalCorreta = correta.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0
    );

    let totalMeioCerto = meioCerto.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0
    );
    let totalErrado = errado.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0
    );
    let totalRespondido = respondido.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0
    );

    return [totalCorreta, totalMeioCerto, totalErrado, totalRespondido];
  }

  excluir(formulario: Formulario): void {
    Swal.fire({
      title: 'Deseja realmente excluir ?',
      text: 'Esse processo não pode ser revertido !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        const index = this.formularios.indexOf(formulario);
        this.formularios.splice(index, 1);
        this.formularioService.excluir(formulario.id).subscribe(() => {
          this.utilService.mostrarMensagemSucesso(
            'Formulario excluido com sucesso !'
          );
          this.buscarEmitter.emit();
        });
      }
    });
  }

  corrigirResposta(
    resposta: FormularioPerguntaResposta,
    pergunta: FormularioPergunta,
    situacao: string
  ): void {
    resposta.situacao = situacao;
    resposta.formularioPergunta = {
      id: pergunta.id,
    };

    this.formularioPerguntaRespostaService.salvar(resposta).subscribe(() => {});
  }
}
