import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../interfaces/venta.interface';
import { Usuario } from '../../../models/usuario.model';
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

  constructor(private ventasService:VentaService) {
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
    this.ventasService.obtenerVentas(termino)
    .subscribe(ventas => {
      
      this.cargando = false;
      this.ventas = ventas.results;
    });
  }

  cargarVentas(){
    this.ventasService.obtenerVentas()
    .subscribe(ventas => {
      this.ventas = ventas.results
      console.log(this.ventas);
      
    });
  }

  detalleVenta(venta:Venta){
    this.venta = venta
  }

  cargaDataPaginacion(event:any) {
    this.ventas=event;
  }

}
