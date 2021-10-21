import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { PaginacionService } from '../../services/paginacion.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() nextPage:string;
  @Input() previousPage:string;
  @Output() mandarData = new EventEmitter();

  public data:any[]=[];

  constructor(private paginacionService:PaginacionService) { }

  ngOnInit(): void {
  }
  
  cambiarPagina(url:string){
    this.paginacionService.paginacionData(url)
    .subscribe(data => {
      this.data = data.results;
      this.nextPage = data.next;
      this.previousPage = data.previous;
      this.mandarData.emit(this.data);
    });
  }

}
