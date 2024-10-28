import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PerguntasService } from "../perguntas/perguntas.service";
import { Pergunta } from "../perguntas/pergunta.interface";
import { GruposService } from "../grupos/grupos.service";
import { Grupo } from "../grupos/grupo.interface";

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.scss'
})
export class IniciarComponent implements OnInit {

  grupo: Grupo | null = null;

  iniciarPesquisa = false;

  perguntas: Pergunta[] = [];

  codigo: number | null = null;

  indexAtual = 0;

  palavraAtual = '';

  imageUrl: string | ArrayBuffer | null | undefined = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly grupoService: GruposService,
    private readonly perguntasService: PerguntasService) {
  }

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.codigo = Number(codigo);
      this.grupoService.getGrupo(this.codigo).then(grupo => {
        this.grupo = grupo;
        // this.perguntasService.getPerguntasComImagem().then(response => {
        this.perguntasService.getPerguntas().then(response => {
          this.perguntas = response;
        });
      });
    }
  }

  atualizarInicializarPesquisa(iniciarPesquisa: boolean): void {
    this.iniciarPesquisa = iniciarPesquisa;
    if (this.grupo?.isMostrarImagemPrimeiro) {
      this.montarProximaImagem();

    } else {
      this.montarProximaPalavra();
    }
  }

  montarProximaPalavra(): void {
    if (this.indexAtual >= this.perguntas.length) {
      this.indexAtual = 0;
      if (!this.grupo?.isMostrarImagemPrimeiro) {
        this.montarProximaImagem();
      }
      return;
    }

    this.palavraAtual = this.perguntas[this.indexAtual].descricao as string;

    setTimeout(() => {
      this.palavraAtual = '';
      setTimeout(() => {
        this.indexAtual++;
        this.montarProximaPalavra();
      }, 100);
    }, 200);
  }

  montarProximaImagem(): void {
    if (this.indexAtual >= this.perguntas.length) {
      this.indexAtual = 0;
      if (this.grupo?.isMostrarImagemPrimeiro) {
        this.montarProximaPalavra();
      }
      return;
    }

    if (this.grupo?.isMostrarImagem) {
      this.imageUrl = this.perguntas[this.indexAtual].imagem as string;
    }

    setTimeout(() => {
      this.imageUrl = '';
      setTimeout(() => {
        this.indexAtual++;
        this.montarProximaImagem();
      }, 100);
    }, 200);
  }

}
