import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Venta } from '../../../interfaces/venta.interface';
import { Usuario } from '../../../models/usuario.model';
import { VentaService } from '../../../services/venta.service';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
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
  public busqueda = '';
  public filtro = '';

  constructor(private ventaService:VentaService, private usuarioService: UsuarioService, private router:Router, private activatedRoute: ActivatedRoute) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {      
      this.cargarVentas(params?.filtro,params.busqueda)
    });
  }

  ngAfterViewChecked(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  cargarVentas(filtro?:string, busqueda?:string){
    this.ventaService.obtenerVentasByUsuario(this.usuario.pk,filtro,busqueda)
    .subscribe(ventas => {
      this.ventas = ventas.results;
      this.previousPage = ventas.previous;
      this.nextPage = ventas.next;      
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
