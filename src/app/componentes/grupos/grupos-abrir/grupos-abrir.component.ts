import { Component, OnInit } from '@angular/core';
import { Grupo } from "../grupo.interface";
import { GruposService } from "../grupos.service";

@Component({
  selector: 'app-grupos-abrir',
  templateUrl: './grupos-abrir.component.html',
  styleUrl: './grupos-abrir.component.scss'
})
export class GruposAbrirComponent implements OnInit {
  grupos: Grupo[] = [];

  gruposService: GruposService;

  constructor(gruposService: GruposService) {
    this.gruposService = gruposService;
  }

  async ngOnInit(): Promise<void> {
    this.grupos = await this.gruposService.getGrupos();
  }

  deletarGrupo(grupo: Grupo) {
    if (grupo.codigo) {
      this.gruposService.deletarGrupo(grupo.codigo).subscribe(response => {
        alert('Grupo deletado com sucesso');
        this.grupos = this.grupos.filter(g => g.codigo !== grupo.codigo);
      }, error => {
        alert('Erro ao deletar grupo');
      });
    }
  }

}
