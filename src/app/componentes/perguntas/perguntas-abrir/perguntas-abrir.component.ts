import { Component, OnInit } from '@angular/core';
import { Pergunta } from "../pergunta.interface";
import { PerguntasService } from "../perguntas.service";

@Component({
  selector: 'app-perguntas-abrir',
  templateUrl: './perguntas-abrir.component.html',
  styleUrl: './perguntas-abrir.component.scss'
})
export class PerguntasAbrirComponent implements OnInit {
  perguntas: Pergunta[] = [];

  perguntasService: PerguntasService;

  constructor(perguntasService: PerguntasService) {
    this.perguntasService = perguntasService;
  }

  async ngOnInit(): Promise<void> {
    this.perguntas = await this.perguntasService.getPerguntas();

  }

  deletarPergunta(pergunta: Pergunta) {
    if (pergunta.codigo) {
      this.perguntasService.deletarPergunta(pergunta.codigo).subscribe(response => {
        alert('Pergunta deletada com sucesso');
        this.perguntas = this.perguntas.filter(p => p.codigo !== pergunta.codigo);
      }, error => {
        alert('Erro ao deletar pergunta');
      });
    }
  }

}
