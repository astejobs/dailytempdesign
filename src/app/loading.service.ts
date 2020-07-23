import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";  
import { Observable } from "rxjs";  
import { UserService } from "./user.service";  
import { TempService } from "./temp.service";  

@Injectable()
export class LoadingService implements Resolve<any> {  
  constructor(private userService: UserService, private tempService: TempService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> {  
    return this.userService.getuserList();  
  }  
  resolveAdd(route: ActivatedRouteSnapshot): Observable<any> {  
    return this.userService.updateUser('',true );  
  }  
  resolveEdit(route: ActivatedRouteSnapshot): Observable<any> {  
    return this.userService.edit('');  
  }  
  resolve1(route: ActivatedRouteSnapshot): Observable<any> {  
    return this.tempService.fetchTemperaturesOnSearch('');  
  }  
  resolveLogin(route: ActivatedRouteSnapshot): Observable<any> {  
    return this.tempService.loginService('');  
  }  
}
