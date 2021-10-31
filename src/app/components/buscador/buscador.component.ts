import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit, AfterViewInit {

  @Input() placeholder:string;

  @ViewChild('txtTermino') busquedaValue:ElementRef<HTMLInputElement>;


  constructor(private router:Router, private activatedRoute: ActivatedRoute, private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.busquedaValue.nativeElement.value = this.activatedRoute.snapshot.queryParamMap.get('busqueda');
    this.cdRef.detectChanges();
  }

  buscar(){
    const termino = this.busquedaValue.nativeElement.value;
    if(termino.length === 0){
      this.router.navigate([], {queryParams:{busqueda:null},queryParamsHandling: 'merge'});
      return;
    }
    this.router.navigate([], {queryParams:{busqueda:termino},queryParamsHandling: 'merge'});
  }

}
