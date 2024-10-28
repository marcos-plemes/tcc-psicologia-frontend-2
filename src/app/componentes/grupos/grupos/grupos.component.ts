import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GruposService } from "../grupos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Ordem } from "../Ordem.interface";

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

  ordens: Ordem[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    fromBuilder: FormBuilder,
    gruposService: GruposService) {

    this.gruposService = gruposService;
    this.form = fromBuilder.group({
      codigo: [],
      nome: ['', [Validators.required]],
      quantidadeDePalavras: [10, [Validators.required]],
      isMostrarImagem: [true, [Validators.required]],
      isMostrarImagemPrimeiro: [false, [Validators.required]],
      isMostrarImagemCorrespondenteAPalavra: [false, [Validators.required]]
    });
  }

  async ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');

    if (codigo && !isNaN(Number(codigo))) {
      this.codigo = Number(codigo);
      const grupo = await this.gruposService.getGrupo(Number(codigo));
      if (grupo) {
        this.form.patchValue({
          nome: grupo.nome,
          quantidadeDePalavras: grupo.quantidadeDePalavras,
          isMostrarImagem: grupo.isMostrarImagem,
          isMostrarImagemPrimeiro: grupo.isMostrarImagemPrimeiro,
          isMostrarImagemCorrespondenteAPalavra: grupo.isMostrarImagemCorrespondenteAPalavra
        });
      }
    }

    this.loading = false;
  }

  async onSubmit(event: Event) {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('nome', this.form.get('nome')?.value);
      formData.append('quantidadeDePalavras', this.form.get('quantidadeDePalavras')?.value);
      formData.append('isMostrarImagem', this.form.get('isMostrarImagem')?.value);
      formData.append('isMostrarImagemPrimeiro', this.form.get('isMostrarImagemPrimeiro')?.value);
      formData.append('isMostrarImagemCorrespondenteAPalavra', this.form.get('isMostrarImagemCorrespondenteAPalavra')?.value);
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

  async gerarOrdemDasPalavras(): Promise<void> {
    this.ordens = await this.gruposService.gerarOrdem(this.form.get('quantidadeDePalavras')?.value || 10);
  }

  salvarOrdem() {
    if (this.ordens && this.codigo) {
      this.gruposService.cadastrarOrdem(this.ordens, Number(this.codigo)).subscribe(response => {
        alert('Ordem salva com sucesso');
      }, error => {
        alert('Erro ao salvar ordem');
      });
    }
  }

}
