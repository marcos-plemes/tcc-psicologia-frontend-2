import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdemDasPalavrasService } from "../../ordem-das-palavras.service";
import { OrdemDaPalavra } from "../../OrdemDaPalavra";
import { OrdemDaPalavraItem } from "../../OrdemDaPalavraItem.interface";
import { Pergunta } from "../../../perguntas/pergunta.interface";
import { PerguntasService } from "../../../perguntas/perguntas.service";

@Component({
  selector: 'app-ordem-da-palavra-itens',
  templateUrl: './ordem-da-palavra-itens.component.html',
  styleUrl: './ordem-da-palavra-itens.component.scss'
})
export class OrdemDaPalavraItensComponent implements OnInit {
  loading: boolean = true;

  form: FormGroup;

  codigo: number | null = null;

  ordemDaPalavra: OrdemDaPalavra | undefined;

  itens: OrdemDaPalavraItem[] = [];

  palavras: Pergunta[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly ordemDaPalavraService: OrdemDasPalavrasService,
    private readonly perguntasService: PerguntasService,
    private readonly formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      itens: this.formBuilder.array([])
    });
  }

  async ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    this.palavras = await this.perguntasService.getPerguntas();
    if (codigo && !isNaN(Number(codigo))) {
      this.codigo = Number(codigo);
      this.ordemDaPalavra = await this.ordemDaPalavraService.getOrdemDaPalavra(Number(codigo));
      if (this.ordemDaPalavra) {
        this.itens = await this.ordemDaPalavraService.itens(Number(codigo));
        this.form.setControl('itens', this.formBuilder.array(
          this.itens.map((item) => this.criarItemForm(item))
        ));
      }
    }
    this.loading = false;
  }

  criarItemForm(item: OrdemDaPalavraItem) {
    return this.formBuilder.group({
      codigo: [item.codigo, [Validators.required]],
      ordemDaPalavra: [item.ordemDaPalavra, [Validators.required]],
      ordem: [item.ordem, [Validators.required]],

      codigoDaPalavraTexto: [item.codigoDaPalavraTexto, [Validators.required]],
      quantidadeDaPalavraTexto: [item.quantidadeDaPalavraTexto, [Validators.required]],
      tempoDaPalavraTexto: [item.tempoDaPalavraTexto, [Validators.required]],
      intervaloDaPalavraTexto: [item.intervaloDaPalavraTexto, [Validators.required]],

      codigoDaPalavraImagem: [item.codigoDaPalavraImagem, [Validators.required]],
      quantidadeDaPalavraImagem: [item.quantidadeDaPalavraImagem, [Validators.required]],
      tempoDaPalavraImagem: [item.tempoDaPalavraImagem, [Validators.required]],
      intervaloDaPalavraImagem: [item.intervaloDaPalavraImagem, [Validators.required]]
    });
  }

  async onSubmit(event: Event) {
    if (this.form.valid) {
      this.ordemDaPalavraService.atualizarItens(this.form.value.itens).subscribe(() => {
        alert('Itens atualizados com sucesso');
      }, error => {
        alert('Erro ao atualizar itens');
      });
    } else {
      alert('Formulário inválido preencha todos os campos');
    }
  }
}
