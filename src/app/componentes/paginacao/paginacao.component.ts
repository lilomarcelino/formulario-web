import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css'],
})
export class PaginacaoComponent implements OnInit {
  @Input() config: PaginationInstance;
  @Input() chamarRequisicao: boolean = true;
  @Input() moverScroll: boolean = true;
  @Output() pageChange = new EventEmitter();

  maxSize: number = 5;

  constructor(private utilsService: UtilService) {}

  ngOnInit() {
    this.config.itemsPerPage = this.pegaItensPorPagina();

    if (this.chamarRequisicao) {
      this.pageChange.emit();
    }
  }

  pageChanged(event: any) {
    this.config.currentPage = event;

    this.pageChange.emit(event);

    if (this.moverScroll) {
      window.scrollTo(0, 0);
    }
  }

  @HostListener('window:resize')
  atualizaMaxSize() {
    this.maxSize = window.innerWidth < 500 ? 5 : 7;
  }

  pegaItensPorPagina() {
    return this.utilsService.pegaItensPorPagina();
  }
}
