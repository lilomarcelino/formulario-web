import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { UsuarioConsultaComponent } from './cadastros/usuario/usuario-consulta/usuario-consulta.component';
import { UsuarioCadastroComponent } from './cadastros/usuario/usuario-cadastro/usuario-cadastro.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { CursoConsultaComponent } from './cadastros/curso/curso-consulta/curso-consulta.component';
import { CursoCadastroComponent } from './cadastros/curso/curso-cadastro/curso-cadastro.component';
import { FaseConsultaComponent } from './cadastros/fase/fase-consulta/fase-consulta.component';
import { FaseCadastroComponent } from './cadastros/fase/fase-cadastro/fase-cadastro.component';
import { FormularioConsultaComponent } from './cadastros/formulario/formulario-consulta/formulario-consulta.component';
import { FormularioCadastroComponent } from './cadastros/formulario/formulario-cadastro/formulario-cadastro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cadastros/usuario', component: UsuarioConsultaComponent },
      {
        path: 'cadastros/usuario/:idUsuario',
        component: UsuarioCadastroComponent,
      },
      { path: 'cadastros/curso', component: CursoConsultaComponent },
      {
        path: 'cadastros/curso/:idCurso',
        component: CursoCadastroComponent,
      },
      { path: 'cadastros/fase', component: FaseConsultaComponent },
      {
        path: 'cadastros/fase/:idFase',
        component: FaseCadastroComponent,
      },
      { path: 'cadastros/formulario', component: FormularioConsultaComponent },
      {
        path: 'cadastros/formulario/:idFormulario',
        component: FormularioCadastroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
