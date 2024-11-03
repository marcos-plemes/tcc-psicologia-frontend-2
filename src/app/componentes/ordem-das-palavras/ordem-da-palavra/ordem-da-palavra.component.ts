import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrdemDasPalavrasService } from "../ordem-das-palavras.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-ordem-da-palavra',
  templateUrl: './ordem-da-palavra.component.html',
  styleUrl: './ordem-da-palavra.component.scss'
})
export class OrdemDaPalavraComponent implements OnInit {
  loading: boolean = true;

  form: FormGroup;

  codigo: number | null = null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly ordemDaPalavraService: OrdemDasPalavrasService,
    fromBuilder: FormBuilder) {
    this.form = fromBuilder.group({
      codigo: [],
      descricao: ['', [Validators.required]],
      quantidadeDePalavras: [10, [Validators.required]],
      isMostrarImagemCorrespondenteAPalavra: [true, [Validators.required]]
    });
  }

  async ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');

    if (codigo && !isNaN(Number(codigo))) {
      this.codigo = Number(codigo);
      const ordemDaPalavra = await this.ordemDaPalavraService.getOrdemDaPalavra(Number(codigo));
      if (ordemDaPalavra) {
        this.form.patchValue({
          codigo: ordemDaPalavra.codigo,
          descricao: ordemDaPalavra.descricao,
          quantidadeDePalavras: ordemDaPalavra.quantidadeDePalavras,
          isMostrarImagemCorrespondenteAPalavra: ordemDaPalavra.isMostrarImagemCorrespondenteAPalavra
        });
      }
    }
    this.loading = false;
  }

  async onSubmit(event: Event) {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('descricao', this.form.get('descricao')?.value);
      formData.append('quantidadeDePalavras', this.form.get('quantidadeDePalavras')?.value);
      formData.append('isMostrarImagemCorrespondenteAPalavra', this.form.get('isMostrarImagemCorrespondenteAPalavra')?.value);
      if (this.codigo) {
        formData.append('codigo', this.codigo.toString());
        this.ordemDaPalavraService.alterarOrdemDaPalavra(formData).subscribe(response => {
          alert('Ordem da Palavra alterado com sucesso');
        }, error => {
          alert('Erro ao alterar a ordem da palavra');
        });

      } else {
        this.ordemDaPalavraService.cadastrarOrdemDaPalavra(formData).subscribe(response => {
          alert('Ordem da Palavra cadastrado com sucesso');
          this.router.navigate(['/ordem-das-palavras', response.codigo]);
          this.codigo = response.codigo;
        }, error => {
          alert('Erro ao cadastrar Ordem da Palavra');
        });
      }

    } else {
      alert('Formulário inválido');
    }
  }

}
