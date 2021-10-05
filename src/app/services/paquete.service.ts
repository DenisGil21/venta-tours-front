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

  get headers(){
    return {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  cargarPaquetes(filtro?:string){
    const options = filtro ?
    { params: new HttpParams().set('nombre', filtro) } : {};

    return this.http.get(url,options).pipe(
      map((resp:{next:string, previous:string, results:Paquete[]}) => resp)
    );
  }

  cargarPaquete(id:number){
    return this.http.get(`${url}/${id}`).pipe(
      map((resp:Paquete)=>resp)
    );
  }

  eliminarPaquete(id:number){
    return this.http.delete(`${url}/${id}`,this.headers);
  }

  paginacionPaquetes(url:string){
    return this.http.get(url).pipe(
      map((resp:{next:string, previous:string, results:Paquete[]}) => resp)
    );
  }

  guardarPaquete(paquete:any){
    return this.http.post(url,paquete,this.headers).pipe(
      map((resp:Paquete) => resp)
    )
  }

  actualizarPaquete(paquete:any, id:number){
    return this.http.put(`${url}/${id}`,paquete,this.headers)
    .pipe(
      map((resp:Paquete) => resp)
    );
  }

  async subirPortada(portada: File, id: number){
    try {
      const formData = new FormData();
      formData.append('portada', portada);
      const resp = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
        },
        body: formData
      });
      
      const data = await resp.json();      
      if(data.portada){
        return true;
      }

    } catch (error) {
      return false;
    }
  }
}
