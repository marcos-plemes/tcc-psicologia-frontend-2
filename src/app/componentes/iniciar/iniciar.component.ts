import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GruposService } from "../grupos/grupos.service";
import { Grupo } from "../grupos/grupo.interface";
import Keyboard from 'simple-keyboard';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrdemDasPalavrasService } from "../ordem-das-palavras/ordem-das-palavras.service";
import { OrdemDaPalavraItem } from "../ordem-das-palavras/OrdemDaPalavraItem.interface";
import { RespostasService } from "../respostas/respostas.service";

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.scss'
})
export class IniciarComponent implements OnInit {

  form: FormGroup;

  keyboard: Keyboard | null = null;

  grupo: Grupo | null = null;

  iniciarPesquisa = false;

  itens: OrdemDaPalavraItem[] = [];

  codigo: number | null = null;

  indexAtual = 0;

  palavraAtual = '';

  imageUrl: string | ArrayBuffer | null | undefined = null;

  respostaLiberada: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly grupoService: GruposService,
    private readonly respostasService: RespostasService,
    private readonly ordemDasPalavras: OrdemDasPalavrasService,
    private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      respostas: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.codigo = Number(codigo);
      this.grupoService.getGrupo(this.codigo).then(grupo => {
        this.grupo = grupo;
        this.ordemDasPalavras.itensComImagem(this.grupo.ordemDaPalavra as number).then(response => {
          this.itens = response;
          this.form.setControl('respostas', this.formBuilder.array(
            this.itens.map((item) => this.criarItemForm(item))
          ));
        });
      });
    }

    this.keyboard = new Keyboard({
      layout: {
        default: [
          "\u0027 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "q w e r t y u i o p \u005b \u005d \\",
          "a s d f g h j k l ç \u00b4 ~ {enter}",
          "z x c v b n m , . ; / {shift}",
          "{space}"
        ],
        shift: [
          "\" ! @ # $ % ¨ & * ( ) _ + {bksp}",
          "Q W E R T Y U I O P { } |",
          "A S D F G H J K L Ç ` ^ {enter}",
          "Z X C V B N M < > : ? {shift}",
          "{space}"
        ]
      },
      display: {
        '{bksp}': '⌫',
        '{enter}': '⏎',
        '{shift}': '⇧',
        '{space}': 'Espaço'
      },
      onChange: input => this.keyboardOnChange(input as unknown as string),
      onKeyPress: button => this.keyboardButtonPress(button)
    });

  }

  criarItemForm(item: OrdemDaPalavraItem) {
    return this.formBuilder.group({
      resposta: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fim: ['', [Validators.required]]
    });

  }

  keyboardOnChange(input: string): void {
    (this.form.get('respostas') as FormArray)?.at(this.indexAtual)?.get('resposta')?.setValue(input);
  };

  keyboardButtonPress(button: string): void {
    if (button === "{shift}" || button === "{lock}") {
      this.handleShift();
    }
  }

  handleShift(): void {
    if (this.keyboard) {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });

    }

  }

  salvar() {
    this.responder();
    if (this.form.valid) {
      this.respostasService.cadastrar(this.codigo as number, this.form.value.respostas).subscribe(() => {
        this.router.navigate(['/finalizar']);
        
      }, error => {
        alert('Erro ao finalizar');
      });
    }
  }

  atualizarInicializarPesquisa(iniciarPesquisa: boolean): void {
    this.iniciarPesquisa = iniciarPesquisa;
    this.contagemRegresiva(3);
  }

  contagemRegresiva(contagem: number): void {
    this.palavraAtual = contagem.toString();
    if (contagem === 0) {
      this.palavraAtual = '';
      this.inicializarPesquisa();
    } else {
      setTimeout(() => {
        this.contagemRegresiva(contagem - 1);
      }, 1000);
    }

  }

  inicializarPesquisa() {
    if (this.grupo?.isMostrarImagemPrimeiro) {
      this.montarProximaImagem();

    } else {
      this.montarProximaPalavra();
    }
  }

  montarProximaPalavra(): void {
    if (this.indexAtual >= this.itens.length) {
      this.indexAtual = 0;
      if (!this.grupo?.isMostrarImagemPrimeiro) {
        this.montarProximaImagem();

      } else {
        this.liberarRespostas();
      }
      return;
    }

    this.palavraAtual = this.itens[this.indexAtual].descricao as string;

    setTimeout(() => {
      this.palavraAtual = '';
      setTimeout(() => {
        this.indexAtual++;
        this.montarProximaPalavra();
      }, this.itens[this.indexAtual].intervaloDaPalavraTexto);
    }, this.itens[this.indexAtual].tempoDaPalavraTexto);
  }

  montarProximaImagem(): void {
    if (this.indexAtual >= this.itens.length) {
      this.indexAtual = 0;
      if (this.grupo?.isMostrarImagemPrimeiro) {
        this.montarProximaPalavra();

      } else {
        this.liberarRespostas();
      }
      return;
    }

    if (this.grupo?.isMostrarImagem) {
      this.imageUrl = this.itens[this.indexAtual].imagem as string;
    }

    setTimeout(() => {
      this.imageUrl = '';
      setTimeout(() => {
        this.indexAtual++;
        this.montarProximaImagem();
      }, this.itens[this.indexAtual].intervaloDaPalavraImagem);
    }, this.itens[this.indexAtual].tempoDaPalavraImagem);
  }

  liberarRespostas() {
    this.respostaLiberada = true;
    this.respostas.at(this.indexAtual)?.get('resposta');
    (this.form.get('respostas') as FormArray)?.at(this.indexAtual)?.get('inicio')?.setValue(new Date());
  }

  responder(): void {
    this.respostas.at(this.indexAtual)?.get('resposta')?.markAsTouched();
    if (this.respostas.at(this.indexAtual)?.get('resposta')?.valid) {
      this.respostas.at(this.indexAtual)?.get('fim')?.setValue(new Date());
      this.indexAtual++;
      this.respostas.at(this.indexAtual)?.get('inicio')?.setValue(new Date());
      this.keyboard?.clearInput();
    }
  }

  get respostas(): FormArray {
    return this.form.get('respostas') as FormArray;
  }

}
