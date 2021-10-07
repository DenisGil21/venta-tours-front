import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;
const url = `${base_url}/api/galerias`;

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private http:HttpClient) { }

  get headers(){
    return {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  eliminarGaleria(id:number){
    return this.http.delete(`${url}/${id}`,this.headers);
  }

  async subirImagen(imagen: File, paquete: string){
    try {
      const formData = new FormData();
      formData.append('imagen', imagen);
      formData.append('paquete', paquete);
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
        },
        body: formData
      });
      
      const data = await resp.json();      
      if(data){
        return true;
      }

    } catch (error) {
      return false;
    }
  }
}
