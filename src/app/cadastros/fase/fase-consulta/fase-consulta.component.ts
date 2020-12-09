import { Component, OnInit } from '@angular/core';
import { Fase } from 'src/app/model/fase.model';
import { FaseService } from 'src/app/service/fase.service';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fase-consulta',
  templateUrl: './fase-consulta.component.html',
  styleUrls: ['./fase-consulta.component.css'],
})
export class FaseConsultaComponent implements OnInit {
  public config = this.utilService.retornaConfigPaginacao('faseConsulta');

  fases: Array<Fase>;
  faseFiltro: any;

  constructor(
    private faseService: FaseService,
    public utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fases = new Array<Fase>();
    this.faseFiltro = new Object();
  }

  buscar(): void {
    const param = {
      size: this.config.itemsPerPage,
      page: this.config.currentPage - 1,
      fields: this.retornaCamposPadroes(),
      search: this.retornaFiltroFase(),
      sort: 'nome,asc',
    };

    this.utilService.mostrarSpinner();

    this.faseService
      .buscarTodos(this.utilService.removeAtributosVazio(param))
      .subscribe((response) => {
        this.config.totalItems = response.totalElements;
        this.fases = response.content;

        this.utilService.esconderSpinner();
      });
  }

  temFases(): boolean {
    return this.fases && this.fases.length > 0;
  }

  retornaCamposPadroes(): string {
    return 'id,nome';
  }

  retornaFiltroFase(): string {
    const retornaFiltros = () => {
      let filtros = '';
      Object.keys(search).forEach((item) => (filtros += search[item]()));
      return filtros.replace(/,$/, '');
    };

    const search = {
      nome: () => {
        return this.faseFiltro.nome && this.faseFiltro.nome != ''
          ? `nome:${this.faseFiltro.nome}`
          : '';
      },
    };

    return retornaFiltros();
  }

  cadastrar(): void {
    this.router.navigate(['cadastros/fase/cadastrar']);
  }
}
