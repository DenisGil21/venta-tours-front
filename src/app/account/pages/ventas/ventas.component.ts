import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../interfaces/venta.interface';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit, AfterViewChecked {

  public cargando = false;
  public ventas:Venta[]=[];
  public venta:Venta;
  public nextPage:string;
  public previousPage:string;
  public usuario:Usuario

  constructor(private ventaService:VentaService) {
  }

  ngOnInit(): void {
    this.cargarVentas();    
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
    this.ventaService.obtenerVentas(termino)
    .subscribe(ventas => {
      
      this.cargando = false;
      this.ventas = ventas.results;
    });
  }

  cargarVentas(){
    this.ventaService.obtenerVentas()
    .subscribe(ventas => {
      this.ventas = ventas.results;
      this.previousPage = ventas.previous;
      this.nextPage = ventas.next;      
    });
  }

  detalleVenta(venta:Venta){
    this.venta = venta
  }

  // Reembolso dependiendo el metodo de pago
  reembolsar(venta:Venta){
    Swal.fire({
      title: '¿Esta seguro que desea reembolsar?',
      text: `Esta a punto de aprobar el reembolso al usuario ${venta.user.username}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, aprobar reembolso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.aprobarReembolso(venta)
      }
    });
  }

  aprobarReembolso(venta:Venta){
    if (venta.metodo_pago == 'PAYPAL') {
      this.ventaService.reembolsoPaypal(venta.reembolso_compra)
      .subscribe(resp => {
        this.ventaService.editarVenta(venta.id,3)
        .subscribe(resp => {
          this.cargarVentas();
          Swal.fire('Reembolsado', 'Se ha aprobado el reembolso', 'success');
        });
      }, (err) => {
        console.log(err);
        Swal.fire('Error', 'Hubo un error al aprobar el reembolso', 'error');
      });
    }else{
      this.ventaService.editarVenta(venta.id,3)
      .subscribe(resp => {
        Swal.fire('Reembolsado', 'Se ha aprobado el reembolso', 'success');
      }, (err) => {
        console.log(err);
        Swal.fire('Error', 'Hubo un error al aprobar el reembolso', 'error');
      });
    }
  }

  cargaDataPaginacion(event:any) {
    this.ventas=event;
  }

}
