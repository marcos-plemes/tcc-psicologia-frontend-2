import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerguntasAbrirComponent } from "./componentes/perguntas/perguntas-abrir/perguntas-abrir.component";
import { PerguntasComponent } from "./componentes/perguntas/perguntas/perguntas.component";

const routes: Routes = [
  { path: 'perguntas/abrir', component: PerguntasAbrirComponent },
  { path: 'perguntas/:codigo', component: PerguntasComponent },
  { path: '**', redirectTo: '/perguntas/abrir', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
