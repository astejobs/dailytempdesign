import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TempService {
  temp:any={};
  menu=new Subject<any>();
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    }),
    observe:'response'  as 'body'
  }
  //baseURL = 'http://ifarms.com.sg:8086/DailyTemperatureApp6/';
 //baseURL = 'http://localhost:8082/';
 baseURL = 'http://192.168.21.171:8080/';


  constructor(private http:HttpClient) { }

  save(data){
    console.log(this.httpOptions);
    const url=this.baseURL+"temperature";
    return this.http.post(url,data,this.httpOptions).pipe(map((response:any)=>{

        return response;
     }));      
 }

 loginService(data){
    const url=this.baseURL+"authenticate";
    return this.http.post(url,data,{'observe':'response'}).pipe(map((response)=>{  
    
    return response;
  }));


 }
 
 
 fetchTemperaturesOnSearch(data){
  const url=this.baseURL+"temperatures";
    return this.http.post(url,data,{'observe':'response'}).pipe(map((response)=>{  
    return response;
  }));
}

getUser(usernric:string){
  const url=this.baseURL+"userdetail/"+usernric;
  return this.http.get(url,{'observe':'response'}).pipe(map((response)=>{  
  return response    

}));
 
}
}
