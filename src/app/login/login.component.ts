import { Component, OnInit } from '@angular/core';
import { TempService } from '../temp.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
   user:any={};
   errorLbl:string;
  constructor( private myService: TempService,private route:Router) {
  
   }
   

  ngOnInit(): void {  
        
  }
  onLogin( ){
    this.myService.loginService(this.user).subscribe((response:any)=>{
      if(response.status==200){     
        localStorage.setItem('token',response.body['token']);
        localStorage.setItem('role',response.body['role']);
        this.errorLbl="";
        this.myService.menu.next();
        this.route.navigateByUrl('temperature');
      }else {
        this.errorLbl="Wrong Credentials";
      }
     },(err:any)=>{
       this.errorLbl="Wrong Credentials";
      console.log(err);
     }
     );
  }


}
