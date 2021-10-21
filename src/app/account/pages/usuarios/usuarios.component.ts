import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public cargando = false;

  public usuarios:Usuario[] = [];
  public nextPage:string;
  public previousPage:string;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.cargarUsuarios();      
      return;
    }
    this.cargando = true;
    this.usuarioService.obtenerUsusarios(termino)
    .subscribe(usuarios => {
      
      this.cargando = false;
      this.usuarios = usuarios.results;
    });
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.obtenerUsusarios()
    .subscribe(resp => {
      this.cargando = false;
      this.nextPage = resp.next;
      this.previousPage = resp.previous;
      this.usuarios = resp.results;
    })
  }

  cargaDataPaginacion(event:any) {
    this.usuarios=event;
  }
}
