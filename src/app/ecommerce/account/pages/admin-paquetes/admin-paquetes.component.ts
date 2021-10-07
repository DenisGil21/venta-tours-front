import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { PaqueteService } from '../../../../services/paquete.service';
import { Paquete } from '../../../../interfaces/paquete.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-admin-paquetes',
  templateUrl: './admin-paquetes.component.html',
  styleUrls: ['./admin-paquetes.component.css']
})
export class AdminPaquetesComponent implements OnInit, AfterViewChecked {

  
  public cargando = true;
  public paquetes:Paquete[];
  public nextPage:string;
  public previousPage:string;

  constructor(private paqueteService: PaqueteService, private router:Router) { }

  ngOnInit(): void {
    this.cargarPaquetes();
  }

  ngAfterViewChecked(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  editarPaquete(id:number){
    $('[data-toggle="tooltip"]').tooltip('dispose');
    this.router.navigateByUrl(`/account/paquete/${id}`);
  }

  irGaleria(id:number){
    $('[data-toggle="tooltip"]').tooltip('dispose');
    this.router.navigateByUrl(`/account/galeria/paquete/${id}`);
  }

  cargarPaquetes(){
    this.cargando = true;
    this.paqueteService.cargarPaquetes()
    .subscribe((paquetes) => {
      this.paquetes = paquetes.results;
      this.nextPage = paquetes.next;
      this.previousPage = paquetes.previous;
      this.cargando = false
    });
  }

  buscar(termino:string){    
    if(termino.length === 0){
      this.cargarPaquetes();
      return;
    }
    this.cargando = true;
    this.paqueteService.cargarPaquetes(termino)
    .subscribe(paquetes => {
      console.log(paquetes);
      
      this.cargando = false;
      this.paquetes = paquetes.results;
    });
  }

  eliminarPaquete(paquete:Paquete){
    Swal.fire({
      title: '¿Eliminar paquete?',
      text: `Esta a punto de eliminar a ${paquete.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paqueteService.eliminarPaquete(paquete.id)
        .subscribe(() => {
          Swal.fire(
            'Paquete eliminado',
            `${paquete.nombre} fue eliminado correctamente`,
            'success'
            );
            this.cargarPaquetes();
        });
      }
    })
  }

  paginacion(paginacion:string){
    this.cargando = true;
    this.paqueteService.paginacionPaquetes(paginacion)
    .subscribe(paquetes => {
      this.cargando = false;
      this.paquetes = paquetes.results;
      this.nextPage = paquetes.next;
      this.previousPage = paquetes.previous;
    });
  }

}
