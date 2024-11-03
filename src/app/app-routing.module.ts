import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerguntasAbrirComponent } from "./componentes/perguntas/perguntas-abrir/perguntas-abrir.component";
import { PerguntasComponent } from "./componentes/perguntas/perguntas/perguntas.component";
import { GruposAbrirComponent } from "./componentes/grupos/grupos-abrir/grupos-abrir.component";
import { TelaInicialComponent } from "./componentes/tela-inicial/tela-inicial.component";
import { ConfiguracaoComponent } from "./componentes/configuracao/configuracao.component";
import { GruposComponent } from "./componentes/grupos/grupos/grupos.component";
import { IniciarComponent } from "./componentes/iniciar/iniciar.component";
import { OrdemDasPalavrasAbrirComponent } from "./componentes/ordem-das-palavras/ordem-das-palavras-abrir/ordem-das-palavras-abrir.component";
import { OrdemDaPalavraComponent } from "./componentes/ordem-das-palavras/ordem-da-palavra/ordem-da-palavra.component";
import { OrdemDaPalavraItensComponent } from "./componentes/ordem-das-palavras/ordem-da-palavra/ordem-da-palavra-itens/ordem-da-palavra-itens.component";

const routes: Routes = [
  { path: 'palavras/abrir', component: PerguntasAbrirComponent },
  { path: 'palavras/:codigo', component: PerguntasComponent },
  { path: 'ordem-das-palavras/abrir', component: OrdemDasPalavrasAbrirComponent },
  { path: 'ordem-das-palavras/:codigo', component: OrdemDaPalavraComponent },
  { path: 'ordem-das-palavras/:codigo/itens', component: OrdemDaPalavraItensComponent },
  { path: 'grupos/abrir', component: GruposAbrirComponent },
  { path: 'grupos/:codigo', component: GruposComponent },
  { path: 'iniciar/:codigo', component: IniciarComponent },
  { path: 'configuracao', component: ConfiguracaoComponent },
  { path: '', component: TelaInicialComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
