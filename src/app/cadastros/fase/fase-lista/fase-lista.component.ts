import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fase } from 'src/app/model/fase.model';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FaseService } from 'src/app/service/fase.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-fase-lista',
  templateUrl: './fase-lista.component.html',
  styleUrls: ['./fase-lista.component.css'],
})
export class FaseListaComponent implements OnInit {
  @Input() fases: Array<Fase>;
  @Input() config: PaginationInstance;
  @Output() buscarEmitter = new EventEmitter();

  constructor(
    private router: Router,
    private faseService: FaseService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  editar(id: number): void {
    this.router.navigate([`cadastros/fase/${id}`]);
  }

  excluir(fase: Fase): void {
    // Swal.fire({
    //   title: 'Deseja realmente excluir ?',
    //   text: 'Esse processo não pode ser revertido !',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#28a745',
    //   cancelButtonColor: '#dc3545',
    //   confirmButtonText: 'Sim',
    //   cancelButtonText: 'Cancelar',
    // }).then((result) => {
    //   if (result.value) {
    //     const index = this.fases.indexOf(usuario);
    //     this.fases.splice(index, 1);
    //     this.faseService.excluir(usuario.id).subscribe((response) => {
    //       this.utilService.mostrarMensagemSucesso(
    //         'Usuário excluido com sucesso !'
    //       );
    //       this.buscarEmitter.emit();
    //     });
    //   }
    // });
  }
}
