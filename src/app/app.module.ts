import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PerguntasService } from "./componentes/perguntas/perguntas.service";
import { PerguntasComponent } from './componentes/perguntas/perguntas/perguntas.component';
import { PerguntasAbrirComponent } from './componentes/perguntas/perguntas-abrir/perguntas-abrir.component';

@NgModule({
  declarations: [
    AppComponent,
    PerguntasComponent,
    PerguntasAbrirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PerguntasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
