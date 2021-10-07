import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario

  constructor(private router:Router, private usuarioService: UsuarioService) {
   }

  ngOnInit(): void {
    
  }

  existeUsuario():boolean{
    if(localStorage.getItem('token')){
      this.usuario = new Usuario(localStorage.getItem('username'),'');
      return true
    }else{
      return false
    }
  }

  buscar(termino:string){    
    if (termino.length !== 0){
      this.router.navigateByUrl(`paquetes/${termino}`)
    }else{
      this.router.navigateByUrl('home')
    }
  }

  logout(){
    this.usuarioService.logout();
    this.usuario = null;
    this.router.navigateByUrl('/auth/login')
  }

}
