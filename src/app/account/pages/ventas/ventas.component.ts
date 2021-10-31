import { Component, OnInit, AfterViewChecked, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../interfaces/venta.interface';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit, AfterViewChecked, AfterViewInit {

  public cargando = false;
  public ventas:Venta[]=[];
  public venta:Venta;
  public nextPage:string;
  public previousPage:string;
  public usuario:Usuario;
  @ViewChild('txtTermino') busquedaValue: ElementRef<HTMLInputElement>;
  @ViewChild('asFiltro') filtroValue: ElementRef<HTMLSelectElement>;

  constructor(private ventaService:VentaService, private router:Router, private activatedRoute:ActivatedRoute, private cdRef:ChangeDetectorRef) {
  }

  ngOnInit(): void {    
    this.activatedRoute.queryParams.subscribe(params => {      
      this.cargarVentas(params?.filtro,params.busqueda)
    });

  }

  ngAfterViewChecked(): void {
    $('[data-toggle="tooltip"]').tooltip();
    
  }

  ngAfterViewInit(): void {    
    this.busquedaValue.nativeElement.value = this.activatedRoute.snapshot.queryParamMap.get('busqueda');
    const filtroParams = this.activatedRoute.snapshot.queryParamMap.get('filtro');
    if(filtroParams) {
      this.filtroValue.nativeElement.value = this.activatedRoute.snapshot.queryParamMap.get('filtro');
    }
    this.cdRef.detectChanges();
    
  }

  // Se realizar la busqueda verificando si existe el queryParams de filtro para combinarlos
  buscar(){
    let valor = this.busquedaValue.nativeElement.value;
    if(valor.length === 0){
      this.router.navigate(['/account/ventas'], {queryParams:{busqueda:null},queryParamsHandling: 'merge'});
      return;
    }
    this.router.navigate(['/account/ventas'], {queryParams:{busqueda:valor},queryParamsHandling: 'merge'});
  }

  cargarVentas(filtro?:string, busqueda?:string){
    this.ventaService.obtenerVentas(filtro, busqueda)
    .subscribe(ventas => {
      console.log(ventas);
      
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

  // Se realiza el filtro verificando si existe el queryParams de busqueda para convinarlos
  filtrar(){
    // const filtro = (event.target as HTMLInputElement).value;
    let filtro = this.filtroValue.nativeElement.value;
    
    if (!filtro) {
      this.router.navigate([], {relativeTo: this.activatedRoute, queryParams:{filtro:null}, queryParamsHandling: 'merge'});
      return
    }
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams:{filtro}, queryParamsHandling: 'merge'});
  }

  cargaDataPaginacion(event:any) {
    this.ventas=event;
  }

}
