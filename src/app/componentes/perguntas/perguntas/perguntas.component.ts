import { Component, OnInit } from '@angular/core';
import { PerguntasService } from "../perguntas.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrl: './perguntas.component.scss'
})
export class PerguntasComponent implements OnInit {
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
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      imagem: ['', [Validators.required]]
    });
  }

  async ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');

    if (codigo && !isNaN(Number(codigo))) {
      this.codigo = Number(codigo);
      const pergunta = await this.perguntasService.getPergunta(Number(codigo));
      if (pergunta) {
        this.imageUrl = pergunta.imagem as string;
        this.form.patchValue({
          descricao: pergunta.descricao
        });
      }
    }

    this.loading = false;

  }

  async onSubmit(event: Event) {
    if (this.form.get('descricao')?.valid && this.imageUrl) {
      const formData = new FormData();
      formData.append('descricao', this.form.get('descricao')?.value);
      if (this.selectedFile) {
        formData.append('imagem', this.selectedFile, this.selectedFile?.name);
      }
      if (this.codigo) {
        formData.append('codigo', this.codigo.toString());
        this.perguntasService.alterarPergunta(formData).subscribe(response => {
          alert('Pergunta alterada com sucesso.');
        }, error => {
          alert('Erro ao alterar pergunta.');
        });

      } else {
        this.perguntasService.cadastrarPergunta(formData).subscribe(response => {
          alert('Pergunta cadastrada com sucesso.');
          this.router.navigate(['/perguntas', response.codigo]);
          this.codigo = response.codigo;
        }, error => {
          alert('Erro ao cadastrar pergunta.');
        });
      }
    } else {
      alert('Descrição e imagem são obrigatórios.');
    }

  }

  onFileSelected(event: Event): void {
    this.form.get('imagem')?.markAsTouched();
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result; // Define a URL da imagem
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
  }

  getImageErrorMessage() {
    const imagemControl = this.form.get('imagem');
    if (imagemControl?.hasError('required')) {
      return 'A imagem é obrigatória.';
    } else if (imagemControl?.hasError('invalidType')) {
      return 'Apenas arquivos de imagem são permitidos.';
    } else if (imagemControl?.hasError('maxSizeExceeded')) {
      return 'O tamanho do arquivo não pode exceder 2MB.';
    }
    return 'ttt';
  }

}
