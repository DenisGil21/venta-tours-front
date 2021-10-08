import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      return this.usuarioService.validarToken().pipe(
        tap(autenticado => {
          if (!autenticado) {
            localStorage.removeItem('username')
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.usuarioService.validarToken().pipe(
        tap(autenticado => {
          if (!autenticado) {
            localStorage.removeItem('username')
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
}
