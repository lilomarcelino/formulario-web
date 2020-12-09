import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { GrupoAcesso } from 'src/app/model/grupo-acesso.model';
import { GrupoAcessoService } from 'src/app/service/grupo-acesso.service';
import { UtilService } from 'src/app/service/util.service';
import { Pessoa } from 'src/app/model/pessoa.model';

declare const jQuery: any;

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
})
export class UsuarioCadastroComponent implements OnInit {
  usuario: Usuario;
  grupoAcessoEscolhido: GrupoAcesso;

  gruposAcesso: Array<GrupoAcesso>;
  gruposAcessoUsuario: Array<GrupoAcesso>;

  confirmacaoSenha: string;
  mensagemPadrao: string;

  salvando: boolean;

  dataNascimentoMostrando: any;

  @ViewChild('form') form;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private grupoAcessoService: GrupoAcessoService,
    public utilService: UtilService,
    private router: Router
  ) {}

  async ngOnInit() {
    const idUsuario = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    await this.buscarGrupoAcesso();

    if (idUsuario != 'cadastrar') {
      this.usuarioService
        .buscarPorId(parseInt(idUsuario))
        .subscribe((response) => {
          this.usuario = response;
          this.gruposAcessoUsuario = this.usuario.grupos;

          this.dataNascimentoMostrando = this.utilService.retornaDataPickerComponent(
            this.usuario.pessoa.dataNascimento
          );
        });
    } else {
      this.usuario = new Usuario();
      this.usuario.pessoa = new Pessoa();
      this.gruposAcessoUsuario = new Array<GrupoAcesso>();

      this.dataNascimentoMostrando = this.utilService.retornaDataPickerComponent();
    }

    this.mensagemPadrao = this.utilService.retornaMensagemPadrao(
      'Sem grupos relacionado(s)!'
    );
  }

  async buscarGrupoAcesso(): Promise<any> {
    const response = await this.grupoAcessoService.buscarTodosAsync();
    if (response && response.content) {
      this.gruposAcesso = response.content;
    } else {
      this.gruposAcesso = new Array();
    }
  }

  inserirGrupoAcesso(grupoAcesso: GrupoAcesso): void {
    if (grupoAcesso) {
      const grupo = this.gruposAcessoUsuario.filter((grupo) => {
        return grupo.id == grupoAcesso.id;
      });

      if (grupo && grupo.length > 0) {
        this.utilService.mostrarMensagemAlerta(
          'Grupo já inserido, escolha outro!'
        );
      } else {
        this.gruposAcessoUsuario.push(grupoAcesso);
      }

      this.grupoAcessoEscolhido = null;
    } else {
      this.utilService.mostrarMensagemAlerta('Informe um grupo para inserir!');
    }
  }

  temGrupoAcesso(): boolean {
    return this.gruposAcessoUsuario && this.gruposAcessoUsuario.length > 0;
  }

  inserirGrupo(): void {
    this.usuario.grupos = new Array();
    if (this.usuario.id) {
      this.usuario.grupos = this.gruposAcessoUsuario;
    } else {
      this.gruposAcessoUsuario.forEach((grupo) => {
        this.usuario.grupos.push(grupo);
      });
    }
  }

  excluirGrupoAcesso(grupoAcesso: GrupoAcesso): void {
    const indexLista = this.gruposAcessoUsuario.indexOf(grupoAcesso);
    this.gruposAcessoUsuario.splice(indexLista, 1);
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

    if (
      !this.usuario.id &&
      this.usuario.senha.toLowerCase() != this.confirmacaoSenha.toLowerCase()
    ) {
      this.utilService.mostrarMensagemAlerta(
        'Senha não confere com a repetição da senha.'
      );
      jQuery('#confirmacaoSenha').focus();
      return;
    }

    if (this.usuario.pessoa.email) {
      if (!this.utilService.validarEmail(this.usuario.pessoa.email)) {
        this.utilService.mostrarMensagemAlerta(
          `E-mail ${this.usuario.pessoa.email} inválido !`
        );
        jQuery('#email').focus();
        return;
      }
    }

    this.usuario.pessoa.dataNascimento = this.utilService.retornaDataFormatada(
      this.dataNascimentoMostrando
    );

    if (this.ehTipoDiferente()) {
      this.utilService.mostrarMensagemAlerta(
        'Tipos Diferentes, favor corrigir!'
      );
      return;
    }

    this.inserirGrupo();

    this.usuarioService.salvar(this.usuario).subscribe((response) => {
      this.utilService.mostrarMensagemSucesso('Usuário salvo com sucesso!');
      this.router.navigate(['/cadastros/usuario']);
    });
  }

  ehTipoDiferente(): boolean {
    const tipoDiferente =
      this.usuario.grupos &&
      this.usuario.grupos.filter((grupo) => {
        return grupo.tipoAcesso != `GRUPO_${this.usuario.pessoa.tipo}`;
      });

    return tipoDiferente && tipoDiferente.length > 0;
  }
}
