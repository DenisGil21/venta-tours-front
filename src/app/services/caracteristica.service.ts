import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;
const url = `${base_url}/api/caracteristicas`;

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  constructor(private http:HttpClient) { }

  get headers(){
    return {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  guardarCaracteristica(descripcion:string, paquete:number){
    return this.http.post(url,{descripcion,paquete},this.headers)
  }
}
