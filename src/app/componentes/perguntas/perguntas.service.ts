import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../comum/base.service";
import { Pergunta } from "./pergunta.interface";
import { Observable } from "rxjs";

@Injectable()
export class PerguntasService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getPergunta(codigo: number): Promise<Pergunta> {
    return this.http.get(`${this.getUrbase()}/perguntas/${codigo}`).toPromise() as Promise<Pergunta>;
  }

  getPerguntas(): Promise<Array<Pergunta>> {
    return this.http.get(`${this.getUrbase()}/perguntas`).toPromise() as Promise<Array<Pergunta>>;
  };

  getPerguntasComImagem(): Promise<Array<Pergunta>> {
    return this.http.get(`${this.getUrbase()}/perguntas-com-imagem`).toPromise() as Promise<Array<Pergunta>>;
  };

  cadastrarPergunta(pergunta: any): Observable<any> {
    return this.http.post(`${this.getUrbase()}/perguntas`, pergunta);
  }

  deletarPergunta(codigo: number): Observable<any> {
    return this.http.delete(`${this.getUrbase()}/perguntas/${codigo}`);
  }

  alterarPergunta(pergunta: any): Observable<any> {
    return this.http.put(`${this.getUrbase()}/perguntas`, pergunta);
  }

}
