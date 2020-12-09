import { Component, OnInit, ViewChild } from '@angular/core';
import { Formulario } from 'src/app/model/formulario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from 'src/app/service/formulario.service';
import { UtilService } from 'src/app/service/util.service';
import { FormularioPergunta } from 'src/app/model/formulario-pergunta.model';
import { FormularioPerguntaAlternativa } from 'src/app/model/formulario-pergunta-alternativa.model';
import { AuthService } from 'src/app/service/auth.service';
import { FormularioPerguntaService } from 'src/app/service/formulario-pergunta.service';
import Swal from 'sweetalert2';
import { FormularioPerguntaAlternativaService } from 'src/app/service/formulario-pergunta-alternativa.service';

declare const jQuery: any;

@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css'],
})
export class FormularioCadastroComponent implements OnInit {
  formulario: Formulario;
  pergunta: FormularioPergunta;
  alternativa: FormularioPerguntaAlternativa;

  salvando: boolean;
  inserindoPergunta: boolean;
  inserindoAlternativa: boolean;

  dataInicioMostrando: any;
  dataFimMostrando: any;

  @ViewChild('form') form;
  @ViewChild('formPergunta') formPergunta;
  @ViewChild('formAlternativa') formAlternativa;
  constructor(
    public utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private formularioService: FormularioService,
    private formularioPerguntaService: FormularioPerguntaService,
    private formularioPerguntaAlternativaService: FormularioPerguntaAlternativaService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idFormulario = this.activatedRoute.snapshot.paramMap.get(
      'idFormulario'
    );
    if (idFormulario != 'cadastrar') {
      this.formularioService
        .buscarPorId(parseInt(idFormulario))
        .subscribe((response) => {
          this.formulario = response;
          this.dataInicioMostrando = this.utilService.retornaDataPickerComponent(
            this.formulario.dataInicio
          );
          this.dataFimMostrando = this.utilService.retornaDataPickerComponent(
            this.formulario.dataFim
          );
        });
    } else {
      this.formulario = new Formulario();
      this.formulario.perguntas = new Array<FormularioPergunta>();
      this.dataInicioMostrando = this.utilService.retornaDataPickerComponent();
      this.dataFimMostrando = this.utilService.retornaDataPickerComponent();
    }

    this.pergunta = new FormularioPergunta();
    this.alternativa = new FormularioPerguntaAlternativa();
  }

  salvar(): void {
    this.salvando = true;

    if (this.form.invalid) {
      this.utilService.mostrarMensagemAlerta(
        'Por favor, preencha todos os campos obrigatórios.'
      );
      jQuery('.is-invalid').filter(':input:first').focus();
      return;
    }

    if (!this.temPerguntas()) {
      this.utilService.mostrarMensagemAlerta(
        'Por favor, insira ao menos uma pergunta para prosseguir.'
      );
      return;
    }

    this.formulario.dataInicio = this.utilService.retornaDataFormatada(
      this.dataInicioMostrando
    );
    this.formulario.dataFim = this.utilService.retornaDataFormatada(
      this.dataFimMostrando
    );

    if (!this.formulario.id) {
      this.formulario.situacao = 'ABERTO';
    }

    this.formulario.pessoa = this.authService.getUsuario().pessoa;

    this.formularioService.salvar(this.formulario).subscribe(() => {
      this.utilService.mostrarMensagemSucesso('Formulario salvo com sucesso!');
      this.router.navigate(['/cadastros/formulario']);
    });
  }

  adicionarPergunta(): void {
    this.inserindoPergunta = true;

    if (this.formPergunta.invalid) {
      this.utilService.mostrarMensagemAlerta(
        'Por favor, preencha todos os campos obrigatórios.'
      );
      jQuery('.is-invalid').filter(':input:first').focus();
      return;
    }

    if (this.pergunta.multiplaEscolha) {
      if (this.pergunta.alternativas.length == 0) {
        this.utilService.mostrarMensagemAlerta(
          'Pergunta com alternativas, devem conter ao menos uma alternativa!'
        );
        return;
      }
    }

    this.formulario.perguntas.push(this.pergunta);
    this.pergunta = new FormularioPergunta();
    this.formPergunta.reset();
    this.inserindoPergunta = false;
  }

  adicionarAlternativa(perguntaSerInserida: FormularioPergunta): void {
    this.inserindoAlternativa = true;

    if (this.formAlternativa.invalid) {
      this.utilService.mostrarMensagemAlerta(
        'Por favor, preencha todos os campos obrigatórios.'
      );
      jQuery('.is-invalid').filter(':input:first').focus();
      return;
    }

    const perguntaJaInserida =
      this.formulario.perguntas.filter((pergunta) => {
        return pergunta.nome == perguntaSerInserida.nome;
      }).length > 0;

    if (!perguntaJaInserida) {
      this.formulario.perguntas.push(perguntaSerInserida);
    }

    perguntaSerInserida.alternativas.push(this.alternativa);
    this.alternativa = new FormularioPerguntaAlternativa();
    this.formAlternativa.reset();
    this.inserindoAlternativa = false;
  }

  temPerguntas(): boolean {
    return this.formulario && this.formulario.perguntas.length > 0;
  }

  temAlternativas(): boolean {
    return this.pergunta && this.pergunta.alternativas.length > 0;
  }

  excluirPergunta(pergunta: FormularioPergunta): void {
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
        const index = this.formulario.perguntas.indexOf(pergunta);
        this.formulario.perguntas.splice(index, 1);
        if (pergunta.id) {
          this.formularioPerguntaService.excluir(pergunta.id).subscribe(() => {
            this.utilService.mostrarMensagemSucesso(
              'Pergunta excluido com sucesso !'
            );
          });
        }
      }
    });
  }

  excluirAlternativa(alternativa: FormularioPerguntaAlternativa): void {
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
        const index = this.pergunta.alternativas.indexOf(alternativa);
        this.pergunta.alternativas.splice(index, 1);

        if (alternativa.id) {
          this.formularioPerguntaAlternativaService
            .excluir(alternativa.id)
            .subscribe(() => {
              this.utilService.mostrarMensagemSucesso(
                'Alternativa excluido com sucesso !'
              );
            });
        }
      }
    });
  }
}
