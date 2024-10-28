import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PerguntasService } from "./componentes/perguntas/perguntas.service";
import { PerguntasComponent } from './componentes/perguntas/perguntas/perguntas.component';
import { PerguntasAbrirComponent } from './componentes/perguntas/perguntas-abrir/perguntas-abrir.component';
import { GruposAbrirComponent } from './componentes/grupos/grupos-abrir/grupos-abrir.component';
import { TelaInicialComponent } from './componentes/tela-inicial/tela-inicial.component';
import { ConfiguracaoComponent } from './componentes/configuracao/configuracao.component';
import { GruposService } from "./componentes/grupos/grupos.service";
import { GruposComponent } from './componentes/grupos/grupos/grupos.component';
import { IniciarComponent } from './componentes/iniciar/iniciar.component';
import { CarregarInformacoesComponent } from './componentes/iniciar/carregar-informacoes/carregar-informacoes.component';

@NgModule({
  declarations: [
    AppComponent,
    PerguntasComponent,
    PerguntasAbrirComponent,
    GruposAbrirComponent,
    TelaInicialComponent,
    ConfiguracaoComponent,
    GruposComponent,
    IniciarComponent,
    CarregarInformacoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PerguntasService,
    GruposService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
