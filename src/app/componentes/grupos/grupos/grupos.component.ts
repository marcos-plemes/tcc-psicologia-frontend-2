import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GruposService } from "../grupos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdemDasPalavrasService } from "../../ordem-das-palavras/ordem-das-palavras.service";
import { OrdemDaPalavra } from "../../ordem-das-palavras/OrdemDaPalavra";

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.scss'
})
export class GruposComponent implements OnInit {
  loading: boolean = true;

  form: FormGroup;

  gruposService: GruposService;

  codigo: number | null = null;

  ordensDasPalavras: OrdemDaPalavra[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly ordemDasPalavrasService: OrdemDasPalavrasService,
    fromBuilder: FormBuilder,
    gruposService: GruposService) {

    this.gruposService = gruposService;
    this.form = fromBuilder.group({
      codigo: [],
      nome: ['', [Validators.required]],
      isMostrarImagem: [true, [Validators.required]],
      isMostrarImagemPrimeiro: [false, [Validators.required]],
      ordemDaPalavra: [null, [Validators.required]]
    });
  }

  async ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');

    this.ordensDasPalavras = await this.ordemDasPalavrasService.getOrdemDasPalavras();

    if (codigo && !isNaN(Number(codigo))) {
      this.codigo = Number(codigo);
      const grupo = await this.gruposService.getGrupo(Number(codigo));
      if (grupo) {
        this.form.patchValue({
          nome: grupo.nome,
          isMostrarImagem: grupo.isMostrarImagem,
          isMostrarImagemPrimeiro: grupo.isMostrarImagemPrimeiro,
          ordemDaPalavra: grupo.ordemDaPalavra
        });
      }
    }

    this.loading = false;
  }

  async onSubmit(event: Event) {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('nome', this.form.get('nome')?.value);
      formData.append('isMostrarImagem', this.form.get('isMostrarImagem')?.value);
      formData.append('isMostrarImagemPrimeiro', this.form.get('isMostrarImagemPrimeiro')?.value);
      formData.append('ordemDaPalavra', this.form.get('ordemDaPalavra')?.value);

      if (this.codigo) {
        formData.append('codigo', this.codigo.toString());
        this.gruposService.alterarGrupo(formData).subscribe(response => {
          alert('Grupo alterado com sucesso');
        }, error => {
          alert('Erro ao alterar grupo');
        });
      } else {
        this.gruposService.cadastrarGrupo(formData).subscribe(response => {
          alert('Grupo cadastrado com sucesso');
          this.router.navigate(['/grupos', response.codigo]);
          this.codigo = response.codigo;
        }, error => {
          alert('Erro ao cadastrar grupo');
        });
      }

    } else {
      alert('Formulário inválido');
    }
  }

}
