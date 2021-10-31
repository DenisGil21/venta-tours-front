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

  obtenerVentas(filtro?:string,busqueda?:string){    
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    let params = new HttpParams();

    const options = filtro && busqueda ? 
    { headers, params: params.set('filtro', filtro).set('username', busqueda) } : filtro ?
    { headers, params: params.set('filtro', filtro) } : busqueda ?
    { headers, params: params.set('username', busqueda) } :
    { headers};
    return this.http.get(url, options)
    .pipe(
      map((resp:{next:string,previous:string, results:Venta[]}) => resp)
    )
  }

  obtenerVentasByUsuario(id:number,filtro?:string,busqueda?:string){
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    let params = new HttpParams();

    const options = filtro && busqueda ? 
    { headers, params: params.set('filtro', filtro).set('paquete', busqueda) } : filtro ?
    { headers, params: params.set('filtro', filtro) } : busqueda ?
    { headers, params: params.set('paquete', busqueda) } :
    { headers};
    
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
