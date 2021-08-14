import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Paquete } from '../interfaces/paquete.interface';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
const url = `${base_url}/api/paquetes`
@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor(private http: HttpClient) { }

  cargarPaquetes(){
    return this.http.get(url).pipe(
      map((resp:Paquete[]) => resp)
    );
  }

  cargarPaquete(id:number){
    return this.http.get(`${url}/${id}`).pipe(
      map((resp:Paquete)=>resp)
    )
  }
}
