import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-ventas',
  templateUrl: './filtro-ventas.component.html',
  styleUrls: ['./filtro-ventas.component.css']
})
export class FiltroVentasComponent implements OnInit, AfterViewInit {

  @Output() mandarFiltro = new EventEmitter();

  @ViewChild('asFiltro') filtroValue:ElementRef<HTMLSelectElement>;


  constructor(private router:Router, private activatedRoute: ActivatedRoute, private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const filtroParams = this.activatedRoute.snapshot.queryParamMap.get('filtro');
    if(filtroParams) {
      this.filtroValue.nativeElement.value = this.activatedRoute.snapshot.queryParamMap.get('filtro');
    }
    this.cdRef.detectChanges();
  }

  filtrar(){
    // const filtro = (event.target as HTMLInputElement).value;
    const filtro = this.filtroValue.nativeElement.value;
    this.mandarFiltro.emit(filtro);
    
    if (!filtro) {
      this.router.navigate([], {relativeTo: this.activatedRoute, queryParams:{filtro:null}, queryParamsHandling: 'merge'});
      return
    }
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams:{filtro}, queryParamsHandling: 'merge'});
  }


}
