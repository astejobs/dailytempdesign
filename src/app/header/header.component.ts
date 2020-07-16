import { Component, OnInit } from '@angular/core';
import { TempService } from '../temp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router,private tempService:TempService) { }
  isLoggedIn=false;
  role:any='Admin';
  ngOnInit(): void {
    this.tempService.menu.subscribe(()=>{
      this.isLoggedIn=!this.isLoggedIn;
    });
    //this.role=localStorage.getItem('role');
    if(this.getRole())
      this.isLoggedIn =true; 
  }
getRole() {
  return localStorage.getItem('role');
} 

  goToLogin() {
    this.route.navigateByUrl('');
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.role='';
    this.route.navigateByUrl('');
    this.isLoggedIn=false;
  }
}
