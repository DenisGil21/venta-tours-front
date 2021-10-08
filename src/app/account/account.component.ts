import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public usuario: Usuario;

  constructor(private router:Router, private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  isAccountSetting():boolean{
    if (this.router.url == '/account') {
      return true
    }else{      
      return false
    }
  }

  navegarModulo(url:string){
    this.router.navigateByUrl(`account/${url}`);
  }

}
