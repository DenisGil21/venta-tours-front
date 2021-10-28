import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewChecked {

  public cargando = false;

  public usuarios:Usuario[] = [];
  public nextPage:string;
  public previousPage:string;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngAfterViewChecked(): void {
    $('[data-toggle="tooltip"]').tooltip();
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

  desactivarUsuario(usuario:Usuario){
    console.log(usuario);
    
    Swal.fire({
      title: `${usuario.is_active?'¿Desactivar':'¿Activar'} usuario?`,
      text: `Esta a punto de ${usuario.is_active?'desactivar':'activar'} al usuario ${usuario.username}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Si, ${usuario.is_active?'desactivarlo':'activarlo'}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.desactivarUsuario(usuario.pk,!usuario.is_active)
        .subscribe(() => {
          Swal.fire(
            `Usuario ${usuario.is_active?'desactivado':'activado'}`,
            `${usuario.username} fue ${usuario.is_active?'desactivado':'activado'} correctamente`,
            'success'
            );
            this.cargarUsuarios();
        });
      }
    })
  }

  cargaDataPaginacion(event:any) {
    this.usuarios=event;
  }
}
