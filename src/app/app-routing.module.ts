import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerguntasAbrirComponent } from "./componentes/perguntas/perguntas-abrir/perguntas-abrir.component";
import { PerguntasComponent } from "./componentes/perguntas/perguntas/perguntas.component";
import { GruposAbrirComponent } from "./componentes/grupos/grupos-abrir/grupos-abrir.component";
import { TelaInicialComponent } from "./componentes/tela-inicial/tela-inicial.component";
import { ConfiguracaoComponent } from "./componentes/configuracao/configuracao.component";

const routes: Routes = [
  { path: 'perguntas/abrir', component: PerguntasAbrirComponent },
  { path: 'perguntas/:codigo', component: PerguntasComponent },
  { path: 'grupos/abrir', component: GruposAbrirComponent },
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
