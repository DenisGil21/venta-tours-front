import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Empresa } from '../interfaces/empresa.interface';
import { Paquete } from '../interfaces/paquete.interface';

const base_url = environment.base_url;
const url = `${base_url}/api/empresas`;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  cargarEmpresas(){
    return this.http.get(url).pipe(
      map((resp:Empresa[]) => resp)
    );
  }

  cargarEmpresaPaquetes(id:number){
    return this.http.get(`${url}/${id}/paquetes`).pipe(
      map((resp:Paquete[])=> resp)
    );
  }
}
