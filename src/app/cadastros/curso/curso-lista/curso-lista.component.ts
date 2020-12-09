import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Curso } from 'src/app/model/curso.model';
import { CursoService } from 'src/app/service/curso.service';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['./curso-lista.component.css'],
})
export class CursoListaComponent implements OnInit {
  @Input() cursos: Array<Curso>;
  @Input() config: PaginationInstance;
  @Output() buscarEmitter = new EventEmitter();

  constructor(
    private router: Router,
    private cursoService: CursoService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  editar(id: number): void {
    this.router.navigate([`cadastros/curso/${id}`]);
  }

  excluir(curso: Curso): void {
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
    //     const index = this.cursos.indexOf(usuario);
    //     this.cursos.splice(index, 1);
    //     this.cursoservice.excluir(usuario.id).subscribe((response) => {
    //       this.utilService.mostrarMensagemSucesso(
    //         'Usuário excluido com sucesso !'
    //       );
    //       this.buscarEmitter.emit();
    //     });
    //   }
    // });
  }
}
