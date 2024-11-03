import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../comum/base.service";
import { OrdemDaPalavra } from "./OrdemDaPalavra";
import { Observable } from "rxjs";
import { OrdemDaPalavraItem } from "./OrdemDaPalavraItem.interface";

@Injectable({
  providedIn: 'root'
})
export class OrdemDasPalavrasService extends BaseService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  getOrdemDasPalavras(): Promise<OrdemDaPalavra[]> {
    return this.http.get(`${this.getUrbase()}/ordem-das-palavras`).toPromise() as Promise<OrdemDaPalavra[]>;
  }

  getOrdemDaPalavra(codigo: number): Promise<OrdemDaPalavra> {
    return this.http.get(`${this.getUrbase()}/ordem-das-palavras/${codigo}`).toPromise() as Promise<OrdemDaPalavra>;
  }

  cadastrarOrdemDaPalavra(grupo: any): Observable<any> {
    return this.http.post(`${this.getUrbase()}/ordem-das-palavras`, grupo);
  }

  deletarOrdemDaPalavra(codigo: number): Observable<any> {
    return this.http.delete(`${this.getUrbase()}/ordem-das-palavras/${codigo}`);
  }

  alterarOrdemDaPalavra(grupo: any): Observable<any> {
    return this.http.put(`${this.getUrbase()}/ordem-das-palavras`, grupo);
  }

  itens(codigo: number): Promise<OrdemDaPalavraItem[]> {
    return this.http.get(`${this.getUrbase()}/ordem-das-palavras/${codigo}/itens`).toPromise() as Promise<OrdemDaPalavraItem[]>;
  }

  atualizarItens(itens: OrdemDaPalavraItem[]): Observable<any> {
    return this.http.put(`${this.getUrbase()}/ordem-das-palavras/7/itens`, itens);
  }

}
