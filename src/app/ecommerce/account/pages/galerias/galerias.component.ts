import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaqueteService } from '../../../../services/paquete.service';
import { Paquete } from '../../../../interfaces/paquete.interface';
import { Galeria } from '../../../../interfaces/galeria.iterface';
import Swal from 'sweetalert2';
import { GaleriaService } from '../../../../services/galeria.service';

@Component({
  selector: 'app-galerias',
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent implements OnInit {

  public paquete: Paquete;
  public galerias:Galeria[] = [];
  public cargando:boolean = false;
  public imagen:File;
  public imgTemp = null;
  public imgCarga:string;

  constructor(private activatedRoute:ActivatedRoute, private paqueteService: PaqueteService, private galeriaService: GaleriaService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.activatedRoute.params
    .subscribe(({id}) => {
      this.cargarPaquete(id);
    });
  }

  cargarPaquete(id:number){
    this.paqueteService.cargarPaquete(id)
    .subscribe(paquete => {
      this.cargando = false;
      this.paquete = paquete;
      this.galerias = paquete.galerias;
    })
  }

  cargarImagen(file:File){
    this.imagen = file;
    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    if(!this.imagen){
      Swal.fire('Error', 'Debe seleccionar una imagen', 'error');  
        return ;
    }
    const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(this.imagen.name)){
      Swal.fire('Error', 'Debe ser una imagen con una de las siguientes extensiones (.jpeg/.jpg/.png/.gif)', 'error');  
        return ;
    }

    this.galeriaService.subirImagen(this.imagen, String(this.paquete.id))
    .then(resp => {
      console.log(resp);
      Swal.fire('Subido', 'Imagen subida a la galeria', 'success');     
      this.cargarPaquete(this.paquete.id)
    })
    .catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');  
    });
  }

  eliminarImagen(id:number){
    Swal.fire({
      title: '¿Eliminar imagen?',
      text: `Esta a punto de eliminar la imagen de la galeria`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.galeriaService.eliminarGaleria(id)
         .subscribe(resp => {
          Swal.fire(
            'Imagen eliminada',
            `Eliminado correctamente`,
            'success'
            );
            this.cargarPaquete(this.paquete.id)
        });
      }
    })
  }

}
