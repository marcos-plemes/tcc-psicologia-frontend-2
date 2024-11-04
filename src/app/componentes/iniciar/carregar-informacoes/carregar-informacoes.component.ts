import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrdemDaPalavraItem } from "../../ordem-das-palavras/OrdemDaPalavraItem.interface";

@Component({
  selector: 'app-carregar-informacoes',
  templateUrl: './carregar-informacoes.component.html',
  styleUrl: './carregar-informacoes.component.scss'
})
export class CarregarInformacoesComponent {

  @Input() iniciarPesquisa = false;

  @Input() itens: OrdemDaPalavraItem[] = [];

  @Output() iniciarPesquisaChange = new EventEmitter<boolean>();

  constructor() {

  }

  iniciar(): void {
    this.iniciarPesquisa = true;
    this.iniciarPesquisaChange.emit(this.iniciarPesquisa);
  }

}
