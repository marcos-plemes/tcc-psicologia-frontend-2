import { Injectable } from '@angular/core';
import { BaseService } from "../comum/base.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Resposta } from "./Resposta";

@Injectable({
  providedIn: 'root'
})
export class RespostasService extends BaseService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  cadastrar(grupo: number, resposta: Resposta): Observable<any> {
    return this.http.post(`${this.getUrbase()}/respostas/${grupo}`, resposta);
  }

}
