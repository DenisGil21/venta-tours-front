import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaginacionService {

  constructor(private http:HttpClient) { }


  paginacionData(url:string,urlPrivate=true){
    const options = urlPrivate ? {headers:new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)}: {};
    return this.http.get(url, options).pipe(
      map((resp:{next:string, previous:string, results:any[]}) => resp)
    );
  }
}
