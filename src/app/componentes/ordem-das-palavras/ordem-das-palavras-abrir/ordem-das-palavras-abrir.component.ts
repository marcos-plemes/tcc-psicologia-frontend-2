import { Component, OnInit } from '@angular/core';
import { OrdemDaPalavra } from "../OrdemDaPalavra";
import { OrdemDasPalavrasService } from "../ordem-das-palavras.service";

@Component({
  selector: 'app-ordem-das-palavras-abrir',
  templateUrl: './ordem-das-palavras-abrir.component.html',
  styleUrl: './ordem-das-palavras-abrir.component.scss'
})
export class OrdemDasPalavrasAbrirComponent implements OnInit {

  ordemDaPalavras: OrdemDaPalavra[] = [];

  constructor(private readonly ordemDasPalavrasService: OrdemDasPalavrasService) {
  }

  async ngOnInit(): Promise<void> {
    this.ordemDaPalavras = await this.ordemDasPalavrasService.getOrdemDasPalavras();
  }

  deletarOrdem(ordem: OrdemDaPalavra): void {
    if (ordem.codigo) {
      this.ordemDasPalavrasService.deletarOrdemDaPalavra(ordem.codigo).subscribe(response => {
        alert('Ordem da Palavras deletado com sucesso');
        this.ordemDaPalavras = this.ordemDaPalavras.filter(g => g.codigo !== ordem.codigo);
      }, error => {
        alert('Erro ao deletar grupo');
      });
    }
  }
}
