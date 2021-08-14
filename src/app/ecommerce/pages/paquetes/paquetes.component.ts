import { Component, OnInit } from '@angular/core';
import { PaqueteService } from '../../../services/paquete.service';
import { Paquete } from '../../../interfaces/paquete.interface';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {

  public paquetes:Paquete[]=[];

  constructor(private paqueteService:PaqueteService) { }

  ngOnInit(): void {
    this.cargarPaquetes()
  }

  cargarPaquetes(){
    this.paqueteService.cargarPaquetes()
    .subscribe((paquetes) => {
      this.paquetes=paquetes;
      console.log(this.paquetes);
      
    })
  }

}
