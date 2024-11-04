import { Injectable } from '@angular/core';
import { BaseService } from "../comum/base.service";
import { Observable } from "rxjs";
import { Respostas } from "./Respostas";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RespostasService extends BaseService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  cadastrar(grupo: number, respostas: Respostas[]): Observable<any> {
    return this.http.post(`${this.getUrbase()}/respostas/${grupo}`, respostas);
  }

}
