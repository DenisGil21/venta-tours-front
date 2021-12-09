import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Login } from '../interfaces/login.interface';
import { of, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Registro } from '../interfaces/registro.interface';


const base_url = environment.base_url;
const url = `${base_url}/api/usuarios`;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:Usuario;

  constructor(private http:HttpClient) { }

  get headers(){
    return {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
  
  login(credenciales:Login){
    return this.http.post(`${base_url}/api/token`, credenciales)
    .pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.access)
        localStorage.setItem('refresh', resp.refresh)
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
  }

  validarToken():Observable<boolean>{
    return this.http.post(`${base_url}/api/token/refresh`,{
      'refresh':localStorage.getItem('refresh')
    }).pipe(
      map((resp:any)=>{                
        const {username, email, is_superuser, first_name, last_name, pk} = resp.user;
        this.usuario = new Usuario(username, email, first_name, last_name, pk, is_superuser)
        localStorage.setItem('token', resp.access);
        localStorage.setItem('refresh', resp.refresh)
        localStorage.setItem('username',username)
        return true
      }),
      catchError(error => of(false))
    );
  }

  registroUsuario(data:Registro){
    return this.http.post(`${base_url}/api/usuarios`,data)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.access)
        localStorage.setItem('refresh', resp.refresh)
      })
    )
  }

  actualizarPerfil(id:number,data:any){
    return this.http.put(`${url}/${id}`,data, this.headers)
    .pipe(
      tap((resp:any)=> {
        const {username, email,first_name,last_name, pk} = resp;
        this.usuario = new Usuario(username,email,first_name,last_name,pk)
      })
    );
  }

  obtenerUsusarios(filtro?:string){
    const options = filtro ?
    { headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`), params: new HttpParams().set('nombre', filtro) } : 
    {headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)};
    return this.http.get(url,options).pipe(
      map((resp:{next:string, previous:string, results:Usuario[]}) => resp) 
    )
  }

  // desactivarUsuario(id:number){
  //   return this.http.delete(`${url}/${id}`,this.headers)
  // }

  desactivarUsuario(id:number,active:boolean){
    return this.http.put(`${url}/${id}`,{'is_active':active},this.headers)
  }

}
