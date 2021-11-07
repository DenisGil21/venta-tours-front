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

  cargarPaquetes(busqueda?:string, filtro?:string, precio?:string){
    console.log(precio,'desde service');
    
    let params = new HttpParams();
    if (busqueda) {
      params = params.set('nombre', busqueda);
    }
    if (filtro) {
      params = params.set('filtro', filtro);
    }
    if(precio){
      params = params.set('precio', precio);
    }
    const options = busqueda || filtro || precio ?
    { params } :{};    

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
