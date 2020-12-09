import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from 'src/app/model/login.model';
import { AuthService } from 'src/app/service/auth.service';
import { UtilService } from 'src/app/service/util.service';

declare const jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login = new Login();

  logando: boolean;

  @ViewChild('formLogin') form;
  constructor(
    private authService: AuthService,
    private utilService: UtilService
  ) {}

  ngOnInit() {}

  logar(login: Login): void {
    this.logando = true;

    if (this.form.invalid) {
      this.utilService.mostrarMensagemAlerta(
        'Por favor, preencha todos os campos obrigatórios.'
      );
      jQuery('.is-invalid').filter(':input:first').focus();
      return;
    }
    this.authService.fazerLogin(login);
  }
}
