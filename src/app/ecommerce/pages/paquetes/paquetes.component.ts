import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { PaqueteService } from '../../../services/paquete.service';
import { Paquete } from '../../../interfaces/paquete.interface';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa.interface';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit, OnChanges {
  
  @Input() busqueda:string;

  public cargando:boolean;
  public paquetes:Paquete[]=[];
  public empresas:Empresa[]=[];
  public empresaFiltro:string;

  constructor(private paqueteService:PaqueteService, private empresaService:EmpresaService) { }

  ngOnInit(): void {
    AOS.init();
    this.cargarPaquetes()
    this.cargarEmpresas()
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cargarPaquetes()
  }

  cargarPaquetes(){
    this.cargando = true;
    this.paqueteService.cargarPaquetes(this.busqueda)
    .subscribe((paquetes) => {
      this.cargando = false;
      this.paquetes=paquetes.results;
      console.log(this.paquetes);

    });
  }

  cargarEmpresas(){
    this.empresaService.cargarEmpresas()
    .subscribe(empresa => {
      this.empresas = empresa;
      console.log(empresa);
    });
  }

  filtroEmpresa(id:number,nombre:string){ 
    this.empresaService.cargarEmpresaPaquetes(id)
    .subscribe(resp => {
      this.paquetes = resp;
      this.empresaFiltro = nombre
    });
  }

  removeFiltroEmpresa(){
    this.empresaFiltro = ""
    this.cargarPaquetes()
  }

}
