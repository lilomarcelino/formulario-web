import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css'],
})
export class UsuarioListaComponent implements OnInit {
  @Input() usuarios: Array<Usuario>;
  @Input() config: PaginationInstance;
  @Output() buscarEmitter = new EventEmitter();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  editar(id: number): void {
    this.router.navigate([`cadastros/usuario/${id}`]);
  }

  excluir(usuario: Usuario): void {
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
    //     const index = this.usuarios.indexOf(usuario);
    //     this.usuarios.splice(index, 1);
    //     this.usuarioService.excluir(usuario.id).subscribe((response) => {
    //       this.utilService.mostrarMensagemSucesso(
    //         'Usuário excluido com sucesso !'
    //       );
    //       this.buscarEmitter.emit();
    //     });
    //   }
    // });
  }
}
