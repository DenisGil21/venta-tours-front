import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Login } from '../interfaces/login.interface';
import { of, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;
const url = `${base_url}/api/usuarios`;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:Usuario;

  constructor(private http:HttpClient) { }
  
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
  }

  validarToken():Observable<boolean>{
    return this.http.post(`${base_url}/api/token/refresh`,{
      'refresh':localStorage.getItem('refresh')
    }).pipe(
      map((resp:any)=>{
        const {username, email, pk} = resp.user;
        this.usuario = new Usuario(username,email,pk)
        localStorage.setItem('token', resp.access);
        return true
      }),
      catchError(error => of(false))
    );
  }
}
