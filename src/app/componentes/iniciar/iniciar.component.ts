import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PerguntasService } from "../perguntas/perguntas.service";
import { Pergunta } from "../perguntas/pergunta.interface";
import { GruposService } from "../grupos/grupos.service";
import { Grupo } from "../grupos/grupo.interface";
import Keyboard from 'simple-keyboard';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.scss'
})
export class IniciarComponent implements OnInit {

  form: FormGroup;

  value = "";

  keyboard: Keyboard | null = null;

  grupo: Grupo | null = null;

  iniciarPesquisa = false;

  perguntas: Pergunta[] = [];

  codigo: number | null = null;

  indexAtual = 0;

  palavraAtual = '';

  imageUrl: string | ArrayBuffer | null | undefined = null;

  respostaLiberada: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly grupoService: GruposService,
    private readonly perguntasService: PerguntasService,
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
        // this.perguntasService.getPerguntasComImagem().then(response => {
        this.perguntasService.getPerguntasComImagem().then(response => {
          this.perguntas = response;
          this.form.setControl('respostas', this.formBuilder.array(
            this.perguntas.map(() => this.formBuilder.control('', Validators.required))
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
      onchange: input => this.keyboardOnChange(input as unknown as string),
      onKeyPress: button => this.keyboardButtonPress(button)
    });

  }

  keyboardOnChange(input: string): void {
    this.value = input;
    console.log("JJOJ");
  };

  keyboardButtonPress(button: string): void {
    this.value = button;
  }

  onInputChange = (event: any) => {
    console.log('teste');
    if (this.keyboard) {
      this.keyboard.setInput(event.target.value);
    }
  };

  salvar() {
    if (!this.form.valid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
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
      } else {
        this.respostaLiberada = true;
      }
      return;
    }

    this.palavraAtual = this.perguntas[this.indexAtual].descricao as string;

    setTimeout(() => {
      this.palavraAtual = '';
      setTimeout(() => {
        this.indexAtual++;
        this.montarProximaPalavra();
      }, 1000);
    }, 2000);
  }

  montarProximaImagem(): void {
    if (this.indexAtual >= this.perguntas.length) {
      this.indexAtual = 0;
      if (this.grupo?.isMostrarImagemPrimeiro) {
        this.montarProximaPalavra();
      } else {
        this.respostaLiberada = true;
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
      }, 1000);
    }, 2000);
  }

}
