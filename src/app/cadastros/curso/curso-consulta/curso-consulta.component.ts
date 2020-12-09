import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/service/curso.service';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';
import { Curso } from 'src/app/model/curso.model';

@Component({
  selector: 'app-curso-consulta',
  templateUrl: './curso-consulta.component.html',
  styleUrls: ['./curso-consulta.component.css'],
})
export class CursoConsultaComponent implements OnInit {
  public config = this.utilService.retornaConfigPaginacao('cursoConsulta');

  cursos: Array<Curso>;
  cursoFiltro: any;

  constructor(
    private cursoService: CursoService,
    public utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursos = new Array<Curso>();
    this.cursoFiltro = new Object();
  }

  buscar(): void {
    const param = {
      size: this.config.itemsPerPage,
      page: this.config.currentPage - 1,
      fields: this.retornaCamposPadroes(),
      search: this.retornaFiltroCurso(),
      sort: 'nome,asc',
    };

    this.utilService.mostrarSpinner();

    this.cursoService
      .buscarTodos(this.utilService.removeAtributosVazio(param))
      .subscribe((response) => {
        this.config.totalItems = response.totalElements;
        this.cursos = response.content;
        this.utilService.esconderSpinner();
      });
  }

  temCursos(): boolean {
    return this.cursos && this.cursos.length > 0;
  }

  retornaCamposPadroes(): string {
    return 'id,nome';
  }

  retornaFiltroCurso(): string {
    const retornaFiltros = () => {
      let filtros = '';
      Object.keys(search).forEach((item) => (filtros += search[item]()));
      return filtros.replace(/,$/, '');
    };

    const search = {
      nome: () => {
        return this.cursoFiltro.nome && this.cursoFiltro.nome != ''
          ? `nome:${this.cursoFiltro.nome}`
          : '';
      },
    };

    return retornaFiltros();
  }

  cadastrar(): void {
    this.router.navigate(['cadastros/curso/cadastrar']);
  }
}
