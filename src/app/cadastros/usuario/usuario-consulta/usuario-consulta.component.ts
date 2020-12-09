import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-consulta',
  templateUrl: './usuario-consulta.component.html',
  styleUrls: ['./usuario-consulta.component.css'],
})
export class UsuarioConsultaComponent implements OnInit {
  public config = this.utilService.retornaConfigPaginacao('usuarioConsulta');

  usuarios: Array<Usuario>;
  usuarioFiltro: any;

  constructor(
    private usuarioService: UsuarioService,
    public utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarios = new Array<Usuario>();
    this.usuarioFiltro = new Object();
  }

  buscar(): void {
    const usuarioParam = {
      size: this.config.itemsPerPage,
      page: this.config.currentPage - 1,
      fields: this.retornaCamposPadroes(),
      search: this.retornaFiltroUsuario(),
    };

    this.utilService.mostrarSpinner();

    this.usuarioService
      .buscarTodos(this.utilService.removeAtributosVazio(usuarioParam))
      .subscribe((response) => {
        this.config.totalItems = response.totalElements;
        this.usuarios = response.content;

        this.utilService.esconderSpinner();
      });
  }

  temUsuarios(): boolean {
    return this.usuarios && this.usuarios.length > 0;
  }

  retornaCamposPadroes(): string {
    return 'id,login,pessoa';
  }

  retornaFiltroUsuario(): string {
    const retornaFiltros = () => {
      let filtros = '';
      Object.keys(search).forEach((item) => (filtros += search[item]()));
      return filtros.replace(/,$/, '');
    };

    const search = {
      nome: () => {
        return this.usuarioFiltro.nome && this.usuarioFiltro.nome != ''
          ? `pessoa.nome:${this.usuarioFiltro.nome}`
          : '';
      },
    };

    return retornaFiltros();
  }

  cadastrar(): void {
    this.router.navigate(['cadastros/usuario/cadastrar']);
  }
}
