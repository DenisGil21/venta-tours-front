import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaginacionService {

  constructor(private http:HttpClient) { }

  get headers(){
    return {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  paginacionData(url:string){
    return this.http.get(url, this.headers).pipe(
      map((resp:{next:string, previous:string, results:any[]}) => resp)
    );
  }
}
