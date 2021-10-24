import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../interfaces/venta.interface';
import { Usuario } from '../../../models/usuario.model';
import { VentaService } from '../../../services/venta.service';
import { UsuarioService } from '../../../services/usuario.service';
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

  detalleVenta(venta:Venta){
    this.venta = venta
  }

  cargaDataPaginacion(event:any) {
    this.ventas=event;
  }

}
