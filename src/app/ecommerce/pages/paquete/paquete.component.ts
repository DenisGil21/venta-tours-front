import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaqueteService } from '../../../services/paquete.service';
import { Paquete } from '../../../interfaces/paquete.interface';
import { Galeria } from '../../../interfaces/galeria.iterface';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.css']
})
export class PaqueteComponent implements OnInit {

  public paquete:Paquete;
  public galerias: Galeria[];
  public cargando:boolean = true;

  constructor(private paqueteService:PaqueteService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => this.cargarPaquete(id));
  }


  cargarPaquete(id:number){
    this.cargando = true;
    this.paqueteService.cargarPaquete(id)
    .subscribe(paquete => {
      this.paquete = paquete
      this.galerias = paquete.galerias
      this.cargando=false;
      console.log(this.paquete);
    })
  }


}
