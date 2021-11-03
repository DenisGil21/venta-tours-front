import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  get headers(){
    return {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  cargarEmpresas(filtro?:string){
    const options = filtro ?
    { params: new HttpParams().set('search', filtro) } : {};
    
    return this.http.get(url,options).pipe(
      map((resp:Empresa[]) => resp)
    );
  }

  //No esta en uso
  // cargarEmpresaPaquetes(id:number){
  //   return this.http.get(`${url}/${id}/paquetes`).pipe(
  //     map((resp:Paquete[])=> resp)
  //   );
  // }

  crearEmpresa(nombre:string){
    return this.http.post(url,{nombre}, this.headers);
  }

  actualizarEmpresa(id:number,nombre:string){
    return this.http.put(`${url}/${id}`,{nombre}, this.headers);
  }

  eliminarEmpresa(id:number){
    return this.http.delete(`${url}/${id}`,this.headers);
  }
}
