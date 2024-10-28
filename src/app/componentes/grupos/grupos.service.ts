import { Injectable } from "@angular/core";
import { BaseService } from "../comum/base.service";
import { HttpClient } from "@angular/common/http";
import { Grupo } from "./grupo.interface";
import { Observable } from "rxjs";
import { Ordem } from "./Ordem.interface";

@Injectable()
export class GruposService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getGrupo(codigo: number): Promise<Grupo> {
    return this.http.get(`${this.getUrbase()}/grupos/${codigo}`).toPromise() as Promise<Grupo>;
  }

  getGrupos(): Promise<Array<Grupo>> {
    return this.http.get(`${this.getUrbase()}/grupos`).toPromise() as Promise<Array<Grupo>>;
  }

  cadastrarGrupo(grupo: any): Observable<any> {
    return this.http.post(`${this.getUrbase()}/grupos`, grupo);
  }

  deletarGrupo(codigo: number): Observable<any> {
    return this.http.delete(`${this.getUrbase()}/grupos/${codigo}`);
  }

  alterarGrupo(grupo: any): Observable<any> {
    return this.http.put(`${this.getUrbase()}/grupos`, grupo);
  }

  gerarOrdem(quantidade: number): Promise<Array<Ordem>> {
    console.log(quantidade);
    return this.http.get(`${this.getUrbase()}/gerar-ordem/${quantidade}`).toPromise() as Promise<Array<Ordem>>;
  }

  cadastrarOrdem(ordem: Ordem[], grupo: number): Observable<any> {
    return this.http.post(`${this.getUrbase()}/ordem/${grupo}`, ordem);
  }

}
