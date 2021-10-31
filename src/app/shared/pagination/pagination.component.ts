import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { PaginacionService } from '../../services/paginacion.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() nextPage:string;
  @Input() previousPage:string;
  @Output() mandarData = new EventEmitter();
  public next:string;
  public previous:string;

  public data:any[]=[];

  constructor(private paginacionService:PaginacionService) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(): void {    
    this.next = this.nextPage;
    this.previous = this.previousPage;
  }
  
  cambiarPagina(url:string){    
    this.paginacionService.paginacionData(url)
    .subscribe(data => {
      this.data = data.results;
      this.next = data.next;
      this.previous = data.previous;
      this.mandarData.emit(this.data);
    });
  }

}
