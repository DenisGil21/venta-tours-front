import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Venta } from '../interfaces/venta.interface';

const base_url = environment.base_url;
const url = `${base_url}/api/ventas`;

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  get headers(){
    return {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  crearVenta(venta:any){    
    return this.http.post(url,venta,this.headers);
  }

  obtenerVentas(filtro?:string){
    const options = filtro ?
    { headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`), params: new HttpParams().set('username', filtro.toLowerCase()) } : 
    {headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)};
    return this.http.get(url, options)
    .pipe(
      map((resp:{next:string,previous:string, results:Venta[]}) => resp)
    )
  }

  paginacionVentas(url:string){
    return this.http.get(url,this.headers).pipe(
      map((resp:{next:string, previous:string, results:Venta[]}) => resp)
    );
  }
}
