import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService, private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      if (this.usuarioService.usuario.is_superuser) {
        return true
      }else{
        this.router.navigateByUrl('/account');
        return false;
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (this.usuarioService.usuario.is_superuser) {
        return true
      }else{
        this.router.navigateByUrl('/account');
        return false;
      }
  }
  
}
