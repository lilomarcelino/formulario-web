import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Options } from 'select2';
import * as moment from 'moment';
import { PaginationInstance } from 'ngx-pagination';

declare const jQuery: any;

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  LOCALE_DATEPICKER: string = 'pt-br';
  DD_MM_YYYY: string = 'DD/MM/YYYY';
  DD_MM_YYYY_HH_MM_SS: string = 'DD/MM/YYYY hh:mm:ss';

  EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  carregando: boolean;

  constructor(
    private toastrService: ToastrService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  mostrarMensagemSucesso(mensagem: string): void {
    this.toastrService.success(mensagem, 'Sucesso!');
  }

  mostrarMensagemAlerta(mensagem: string): void {
    this.toastrService.warning(mensagem, 'Atenção!');
  }

  mostrarMensagemErro(mensagem: string): void {
    this.toastrService.error(mensagem, 'Oops...');
  }

  mostrarSpinner(nomeSpinner: string = 'spinner-geral'): void {
    this.carregando = true;
    this.ngxSpinnerService.show(nomeSpinner);
  }

  esconderSpinner(nomeSpinner: string = 'spinner-geral'): void {
    this.carregando = false;
    this.ngxSpinnerService.hide(nomeSpinner);
  }

  retornaMensagemPadrao(
    mensagem: string = 'Não existe resultado para sua consulta !'
  ): string {
    return mensagem;
  }

  pegaItensPorPagina(): number {
    return window.innerWidth >= 1024 &&
      window.innerWidth <= 1366 &&
      window.innerHeight > 600 &&
      window.innerHeight <= 800
      ? 6
      : 10;
  }

  retornaFiltros(queryParams: any): string {
    if (!queryParams) return '';

    const parametros = Object.keys(queryParams).filter((key) => {
      return queryParams[key];
    });

    return parametros.length > 0
      ? `/search?${jQuery.param(this.removeAtributosVazio(queryParams))}`
      : '';
  }

  removeAtributosVazio(queryParams: any): void {
    const removeAtributoVazio = (obj) => {
      Object.keys(obj).forEach((key) => {
        (obj[key] == null || obj[key] == undefined || obj[key] == '') &&
          delete obj[key];
      });
    };

    removeAtributoVazio(queryParams);

    return queryParams;
  }

  retornaConfigPaginacao(idConfig: string): PaginationInstance {
    return {
      id: idConfig,
      itemsPerPage: this.pegaItensPorPagina(),
      currentPage: 1,
    };
  }

  retornaDescricaoEnum(
    tipoEnum: string,
    valor: string,
    enums: Array<any>
  ): string {
    const retornaDescricao = (valor: string, enums: Array<any>) => {
      const resultado = enums.filter((valorEnum) => {
        return valorEnum.id == valor;
      });

      return resultado && resultado[0]
        ? resultado[0].nome
        : 'Opção Indisponivel';
    };

    const tiposEnum = {
      site: () => {
        return retornaDescricao(valor, enums);
      },
      estoque: () => {
        return retornaDescricao(valor, enums);
      },
      situacao: () => {
        return retornaDescricao(valor, enums);
      },
      status: () => {
        return retornaDescricao(valor, enums);
      },
    };

    const response = tiposEnum[tipoEnum];

    return response ? response() : '';
  }

  transformaObjetoEmArray(obj: any): Array<any> {
    return Object.keys(obj).map((key) => ({
      id: key,
      nome: obj[key],
    }));
  }

  retornaDataFormatada(data: any): string {
    if (data && data.singleDate) {
      const dataLocal = `${data.singleDate.date.year}/${data.singleDate.date.month}/${data.singleDate.date.day}`;
      return moment(dataLocal).utcOffset(0).format(this.DD_MM_YYYY_HH_MM_SS);
    }
  }

  retornaDataPorRegex(data: any) {
    return data.match(/\b(\d+\/\d+\/\d+)\b/g);
  }

  retornaOpcoesSelect2(mutiplos: boolean): Options {
    return {
      multiple: mutiplos,
      theme: 'classic',
      closeOnSelect: true,
      language: 'pt-BR',
    };
  }

  validarEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  retornaDataPickerComponent(data?: any): any {
    const dataLocal = data ? moment(data, this.DD_MM_YYYY) : moment();

    return {
      isRange: false,
      singleDate: {
        date: {
          year: dataLocal.format('YYYY'),
          month: dataLocal.format('M'),
          day: dataLocal.format('D'),
        },
      },
    };
  }
}
