import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = 'http://192.168.21.171:8080/';
 //baseURL = 'http://localhost:8082/';
 temp:any=[];
 
  constructor(private http:HttpClient) { }
     getuserList(){
      const url=this.baseURL+"users";
      return this.http.get(url,{'observe':'response'}).pipe(map((response)=>{    
      return response;
    }));
    }
    remove(id){
      const url=this.baseURL+"user/delete/"+id;
      return this.http.get(url,{'observe':'response'}).pipe(map((response)=>{  
     
      return response;
      }));
    }
    edit(id){
      const url=this.baseURL+"user/"+id;
      return this.http.get(url,{'observe':'response'}).pipe(map((response)=>{  
        this.temp=response.body;
        return response;      
      }));  
    }


      updateUser(data){
        const url=this.baseURL+"update";
        return this.http.put(url,data,{'observe':'response'}).pipe(map((response:any)=>{
        return response;
         }));      
        
    }

}
