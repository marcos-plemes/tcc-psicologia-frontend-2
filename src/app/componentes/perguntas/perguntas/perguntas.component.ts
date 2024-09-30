import { Component } from '@angular/core';
import { PerguntasService } from "../perguntas.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrl: './perguntas.component.scss'
})
export class PerguntasComponent {
  loading: boolean = true;

  codigo: number | null = null;

  perguntasService: PerguntasService;

  form: FormGroup;

  selectedFile: File | null = null;

  imageUrl: string | ArrayBuffer | null | undefined = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    fromBuilder: FormBuilder,
    perguntasService: PerguntasService) {

    this.perguntasService = perguntasService;
    this.form = fromBuilder.group({
      codigo: [],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      imagem: ['', [Validators.required]]
    });
  }

}
