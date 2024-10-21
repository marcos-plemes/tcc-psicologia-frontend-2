import { Injectable } from "@angular/core";
import { BaseService } from "../comum/base.service";
import { HttpClient } from "@angular/common/http";
import { Grupo } from "./grupo.interface";
import { Observable } from "rxjs";

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

  cadastrarGrupo(pergunta: any): Observable<any> {
    return this.http.post(`${this.getUrbase()}/grupos`, pergunta);
  }

  deletarGrupo(codigo: number): Observable<any> {
    return this.http.delete(`${this.getUrbase()}/grupos/${codigo}`);
  }

  alterarGrupo(pergunta: any): Observable<any> {
    return this.http.put(`${this.getUrbase()}/grupos`, pergunta);
  }

}
