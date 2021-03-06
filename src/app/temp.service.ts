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
  //baseURL = 'https://ifarms.com.sg:8085/DailyTemperatureApp/';
 baseURL = 'http://localhost:8082/';
 //baseURL = 'http://192.168.21.117:8080/';


  constructor(private http:HttpClient) { }

  save(data,username:string){
    console.log(this.httpOptions);
    const url=this.baseURL+"temperature/"+username;;
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

fetchUnreportedEmployees(search){
  const url=this.baseURL+"unreportedEmployees";
    return this.http.post(url,search,{'responseType':'blob' as 'json'}).pipe(map((response)=>{  
    return response;
  }));
}

fetchReportedEmployees(search){
  const url=this.baseURL+"reportedEmployees";
    return this.http.post(url,search,{'responseType':'blob' as 'json'}).pipe(map((response)=>{  
    return response;
  }));
}

getUser(usernric:string){
  const url=this.baseURL+"userdetail/"+usernric;
  return this.http.get(url,{'observe':'response'}).pipe(map((response)=>{  
  return response  ;  

}));
 
}

getData() {
  const url=this.baseURL+"readingcounts";
  return this.http.get(url,{'observe':'response'}).pipe(map((response)=>{    
  return response;
}));
}
public isAuthenticated(): boolean {
  const token = localStorage.getItem('role');
  // true or false
  if(token=='Admin') return true;
  return false
 }
}
