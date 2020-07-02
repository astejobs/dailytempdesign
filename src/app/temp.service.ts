import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TempService {
  temp:any={};
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
      'observe':'response'
    })

  }
 // baseURL = 'http://ifarms.com.sg:8086/DailyTemperatureApp6/';
 baseURL = 'http://localhost:8082/';
  constructor(private http:HttpClient) { }

  save(data){
    
    const url=this.baseURL+"temperature";
    return this.http.post(url,data,this.httpOptions).pipe(map((response:any)=>{
      console.log(response.status+"jjjjjjj"); 
    return response;
     }));      
 }

 loginService(data){
    const url=this.baseURL+"authenticate";
    return this.http.post(url,data,{'observe':'response'}).pipe(map((response)=>{  
         cd
    return response;
  }));
 }
 
 
 
 
}
