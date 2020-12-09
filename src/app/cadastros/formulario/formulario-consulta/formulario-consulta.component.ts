import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/model/formulario.model';
import { FormularioService } from 'src/app/service/formulario.service';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-formulario-consulta',
  templateUrl: './formulario-consulta.component.html',
  styleUrls: ['./formulario-consulta.component.css'],
})
export class FormularioConsultaComponent implements OnInit {
  public config = this.utilService.retornaConfigPaginacao('formularioConsulta');

  formularios: Array<Formulario>;
  formularioFiltro: any;

  constructor(
    private formularioService: FormularioService,
    private authService: AuthService,
    public utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularios = new Array<Formulario>();
    this.formularioFiltro = new Object();
  }

  buscar(): void {
    const param = {
      size: this.config.itemsPerPage,
      page: this.config.currentPage - 1,
      fields: this.retornaCamposPadroes(),
      search: this.retornaFiltroFormulario(),
      sort: 'nome,asc',
    };

    this.utilService.mostrarSpinner();

    this.formularioService
      .buscarTodos(this.utilService.removeAtributosVazio(param))
      .subscribe((response) => {
        this.config.totalItems = response.totalElements;
        this.formularios = response.content;

        this.utilService.esconderSpinner();
      });
  }

  temFormularios(): boolean {
    return this.formularios && this.formularios.length > 0;
  }

  retornaCamposPadroes(): string {
    return 'id,nome,descricao,dataInicio,dataFim,situacao,perguntas';
  }

  retornaFiltroFormulario(): string {
    const retornaFiltros = () => {
      let filtros = '';
      Object.keys(search).forEach((item) => (filtros += search[item]()));
      return filtros.replace(/,$/, '');
    };

    const search = {
      nome: () => {
        return this.formularioFiltro.nome && this.formularioFiltro.nome != ''
          ? `nome:${this.formularioFiltro.nome},`
          : '';
      },
      pessoa: () => {
        return `pessoa.id:${this.authService.getUsuario().pessoa.id},`;
      },
    };

    return retornaFiltros();
  }

  cadastrar(): void {
    this.router.navigate(['cadastros/formulario/cadastrar']);
  }
}
