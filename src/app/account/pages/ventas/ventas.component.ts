import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../interfaces/venta.interface';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public cargando = false;
  public ventas:Venta[]=[];
  public nextPage:string;
  public previousPage:string;
  public usuario:Usuario

  constructor(private ventasService:VentaService) {
  }

  ngOnInit(): void {
    this.cargarVentas();    
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

  cargaDataPaginacion(event:any) {
    this.ventas=event;
  }

}
