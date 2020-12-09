import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from 'src/app/model/curso.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/service/curso.service';
import { UtilService } from 'src/app/service/util.service';

declare const jQuery: any;

@Component({
  selector: 'app-curso-cadastro',
  templateUrl: './curso-cadastro.component.html',
  styleUrls: ['./curso-cadastro.component.css'],
})
export class CursoCadastroComponent implements OnInit {
  curso: Curso;

  salvando: boolean;

  @ViewChild('form') form;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    public utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idCurso = this.activatedRoute.snapshot.paramMap.get('idCurso');
    if (idCurso != 'cadastrar') {
      this.cursoService.buscarPorId(parseInt(idCurso)).subscribe((response) => {
        this.curso = response;
      });
    } else {
      this.curso = new Curso();
    }
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

    this.cursoService.salvar(this.curso).subscribe((response) => {
      this.utilService.mostrarMensagemSucesso('Curso salvo com sucesso!');
      this.router.navigate(['/cadastros/curso']);
    });
  }
}
