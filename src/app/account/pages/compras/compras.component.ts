import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../interfaces/venta.interface';
import { Usuario } from '../../../models/usuario.model';
import { VentaService } from '../../../services/venta.service';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  public cargando = false;
  public ventas:Venta[]=[];
  public venta:Venta;
  public nextPage:string;
  public previousPage:string;
  public usuario:Usuario;

  constructor(private ventaService:VentaService, private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.cargarVentas()
  }

  ngAfterViewChecked(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  buscar(termino:string){
    if(termino.length === 0){
      this.cargarVentas();      
      return;
    }
    this.cargando = true;
    this.ventaService.obtenerVentasByUsuario(this.usuario.pk,termino)
    .subscribe(ventas => {
      
      this.cargando = false;
      this.ventas = ventas.results;
    });
  }

  cargarVentas(){
    this.ventaService.obtenerVentasByUsuario(this.usuario.pk)
    .subscribe(ventas => {
      this.ventas = ventas.results
      console.log(this.ventas);
      
    });
  }

  cancelarReservacion(venta:Venta){
    const dateNow = new Date();
    const dateEntered = new Date(venta.fecha);
    if (dateNow > dateEntered) {   
      Swal.fire('Error', 'Ya no puede cancelar la reservación', 'error');         
      return
    }
    Swal.fire({
      title: '¿Esta seguro que desea cancelar la reservación del paquete?',
      text: `Se le devolvera el dinero por la reservación del paquete ${venta.paquete.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.editarVenta(venta.id,2)
        .subscribe(resp => {
          this.cargarVentas();
          Swal.fire('Solicitud enviada', 'Su reembolso sera verificado', 'success');
        });
      }
    });    
  }

  detalleVenta(venta:Venta){
    this.venta = venta
  }

  cargaDataPaginacion(event:any) {
    this.ventas=event;
  }

}
