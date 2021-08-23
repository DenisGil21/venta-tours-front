import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Paquete } from '../interfaces/paquete.interface';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
const url = `${base_url}/api/paquetes`;

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor(private http: HttpClient) { }

  cargarPaquetes(filtro:string){
    const options = filtro ?
    { params: new HttpParams().set('nombre', filtro) } : {};

    return this.http.get(url,options).pipe(
      map((resp:Paquete[]) => resp)
    );
  }

  cargarPaquete(id:number){
    return this.http.get(`${url}/${id}`).pipe(
      map((resp:Paquete)=>resp)
    )
  }
}
