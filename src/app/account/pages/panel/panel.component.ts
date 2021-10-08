import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  public usuario: Usuario;

  constructor(private router:Router, private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  navegarModulo(url:string){
    this.router.navigateByUrl(`account/${url}`);
  }

}
