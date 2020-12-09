import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  LocationStrategy,
  HashLocationStrategy,
  registerLocaleData,
} from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgxPhoneMaskBrModule } from 'ngx-phone-mask-br';
import {
  CurrencyMaskConfig,
  CurrencyMaskModule,
  CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';
import localePt from '@angular/common/locales/pt';
import { NgxMaskModule } from 'ngx-mask';
import { ChartjsModule } from '@ctrl/ngx-chartjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { PaginacaoComponent } from './componentes/paginacao/paginacao.component';
import { HomeComponent } from './home/home.component';
import { UsuarioCadastroComponent } from './cadastros/usuario/usuario-cadastro/usuario-cadastro.component';
import { UsuarioConsultaComponent } from './cadastros/usuario/usuario-consulta/usuario-consulta.component';
import { UsuarioListaComponent } from './cadastros/usuario/usuario-lista/usuario-lista.component';
import { CardComponent } from './componentes/card/card.component';
import { TituloComponent } from './componentes/titulo/titulo.component';
import { FaseSelect2Directive } from './componentes/diretivas/fase-select2.directive';
import { CursoSelect2Directive } from './componentes/diretivas/curso-select2.directive';
import { LoginComponent } from './componentes/login/login.component';
import { CursoCadastroComponent } from './cadastros/curso/curso-cadastro/curso-cadastro.component';
import { CursoConsultaComponent } from './cadastros/curso/curso-consulta/curso-consulta.component';
import { CursoListaComponent } from './cadastros/curso/curso-lista/curso-lista.component';
import { FaseConsultaComponent } from './cadastros/fase/fase-consulta/fase-consulta.component';
import { FaseCadastroComponent } from './cadastros/fase/fase-cadastro/fase-cadastro.component';
import { FaseListaComponent } from './cadastros/fase/fase-lista/fase-lista.component';
import { FormularioCadastroComponent } from './cadastros/formulario/formulario-cadastro/formulario-cadastro.component';
import { FormularioConsultaComponent } from './cadastros/formulario/formulario-consulta/formulario-consulta.component';
import { FormularioListaComponent } from './cadastros/formulario/formulario-lista/formulario-lista.component';

registerLocaleData(localePt, 'pt');

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainComponent,
    PaginacaoComponent,
    HomeComponent,
    UsuarioCadastroComponent,
    UsuarioConsultaComponent,
    UsuarioListaComponent,
    CardComponent,
    TituloComponent,
    FaseSelect2Directive,
    CursoSelect2Directive,
    LoginComponent,
    CursoCadastroComponent,
    CursoConsultaComponent,
    CursoListaComponent,
    FaseConsultaComponent,
    FaseCadastroComponent,
    FaseListaComponent,
    FormularioCadastroComponent,
    FormularioConsultaComponent,
    FormularioListaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    AngularMyDatePickerModule,
    NgxPhoneMaskBrModule,
    CurrencyMaskModule,
    ChartjsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
