import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaseService } from 'src/app/service/fase.service';
import { UtilService } from 'src/app/service/util.service';
import { Fase } from 'src/app/model/fase.model';

declare const jQuery: any;

@Component({
  selector: 'app-fase-cadastro',
  templateUrl: './fase-cadastro.component.html',
  styleUrls: ['./fase-cadastro.component.css'],
})
export class FaseCadastroComponent implements OnInit {
  fase: Fase;

  salvando: boolean;

  @ViewChild('form') form;
  constructor(
    private activatedRoute: ActivatedRoute,
    private faseService: FaseService,
    public utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idFase = this.activatedRoute.snapshot.paramMap.get('idFase');
    if (idFase != 'cadastrar') {
      this.faseService.buscarPorId(parseInt(idFase)).subscribe((response) => {
        this.fase = response;
      });
    } else {
      this.fase = new Fase();
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

    this.faseService.salvar(this.fase).subscribe((response) => {
      this.utilService.mostrarMensagemSucesso('Fase salvo com sucesso!');
      this.router.navigate(['/cadastros/fase']);
    });
  }
}
