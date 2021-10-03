import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { EmpresaService } from '../../../../services/empresa.service';
import { Empresa } from '../../../../interfaces/empresa.interface';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit,AfterViewChecked {

  public empresas:Empresa[];
  public cargando:boolean = true;

  constructor(private empresaService:EmpresaService) { }

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  ngAfterViewChecked(): void {
    $('[data-toggle="tooltip"]').tooltip({'placement': 'top'});
  }

  cargarEmpresas(){
    this.cargando = true
    this.empresaService.cargarEmpresas()
    .subscribe(empresas => {
      this.cargando = false;
      this.empresas = empresas
    });
  }

  async abrirSweetAlert() {
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear empresa',
      text: 'Ingrese el nombre de la nueva empresa',
      input: 'text',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputPlaceholder: 'Nombre de la empresa',
      showCancelButton: true,
    })
    
    if (value.trim().length > 0) {
      this.empresaService.crearEmpresa(value)
      .subscribe((resp:any) => {
        console.log(resp);
        Swal.fire('Guardado', resp.nombre, 'success');
        this.cargarEmpresas();
      }, (err) => {
        console.log(err);
        
        Swal.fire('Error', err.error.non_field_errors[0], 'error');
      });
    }
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.cargarEmpresas();      
      return
    }
    this.cargando = true;
    this.empresaService.cargarEmpresas(termino)
    .subscribe(empresas => {
      console.log(empresas);
      
      this.cargando = false;
      this.empresas = empresas;
    });
  }

  actualizarEmpresa(empresa:Empresa){
    this.empresaService.actualizarEmpresa(empresa.id,empresa.nombre)
    .subscribe(
      () => {
        Swal.fire('Actualizado', empresa.nombre, 'success');
      }, (err) => {
        Swal.fire('Error', err.error.non_field_errors[0], 'error');
      });
  }

  eliminarEmpresa(empresa: Empresa) {
    Swal.fire({
      title: '¿Eliminar empresa?',
      text: `Esta a punto de eliminar a ${empresa.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.eliminarEmpresa(empresa.id)
        .subscribe(() => {
          Swal.fire(
            'Empresa eliminada',
            `${empresa.nombre} fue eliminado correctamente`,
            'success'
            );
            this.cargarEmpresas();
        });
      }
    })
  }


}
