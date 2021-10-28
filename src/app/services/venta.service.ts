import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Venta } from '../interfaces/venta.interface';

const base_url = environment.base_url;
const url = `${base_url}/api/ventas`;
const urlUser = `${base_url}/api/usuarios`;

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
    { headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`), params: new HttpParams().set('username', filtro) } : 
    {headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)};
    return this.http.get(url, options)
    .pipe(
      map((resp:{next:string,previous:string, results:Venta[]}) => resp)
    )
  }

  obtenerVentasByUsuario(id:number,filtro?:string){
    const options = filtro ?
    { headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`), params: new HttpParams().set('username', filtro) } : 
    {headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)};
    return this.http.get(`${urlUser}/${id}/ventas`, options)
    .pipe(
      map((resp:{next:string,previous:string, results:Venta[]}) => resp)
    )
  }

  editarVenta(id:number,status:number){
    return this.http.put(`${url}/${id}`,{'status':status},this.headers)
  }

  reembolsoPaypal(id:string){
    const basicAuth  = btoa(`${environment.paypal_client}:${environment.paypal_secret}`);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuth}`
    });
    const urlPaypal = 'https://api-m.sandbox.paypal.com/v2/payments/captures';
    return this.http.post(`${urlPaypal}/${id}/refund`,{},{headers});
  }

}
