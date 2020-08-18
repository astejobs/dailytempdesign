import { Component, OnInit } from '@angular/core';
import { TempService } from '../temp.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
   user:any={};
   errorLbl:string;
   isAdmin:boolean = false;
   adminLoginEnable = "block";
  constructor( private myService: TempService,private route:Router, private spinner: NgxSpinnerService) {
  
   }
   

  ngOnInit(): void {  
       
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('url');  
  }
  onLogin( ){
    
    this.spinner.show();
    this.myService.loginService(this.user).subscribe((response:any)=>{
      console.log("llltokenll"+response.body['token']);
      if(response.status==200){  
        if(response.body['role']=="Admin" && this.isAdmin==false)  {
          this.errorLbl="Wrong Credentials";
        }else{

        console.log(this.user.username+"hdhdhd");       
        localStorage.setItem('token',response.body['token']);
        localStorage.setItem('role',response.body['role']);
        localStorage.setItem('user',this.user.username)
        this.errorLbl="";
        this.myService.menu.next(); this.spinner.hide();
        console.log(localStorage.getItem('role'));
        if(localStorage.getItem('role')=='Admin') {
          this.route.navigateByUrl('dashboard');
        }
        else { this.route.navigateByUrl('temperature'); }  
       
      }    
      }else {
        this.spinner.hide();
        this.errorLbl="Wrong Credentials";
      }
     },(err:any)=>{
      this.spinner.hide();
       this.errorLbl="Wrong Credentials";
      console.log(err);
     }
     ); 
     //this.route.navigateByUrl('temperature'); 
    

  }
 /*  showLogin(selectedOption:boolean) {
    if(selectedOption==true){
      this.isAdmin = true   
  }
   else{
      this.isAdmin=false;
  }
  } */

}
