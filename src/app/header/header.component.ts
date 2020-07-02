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
  ngOnInit(): void {
    this.tempService.menu.subscribe(()=>{
      this.isLoggedIn=!this.isLoggedIn;
    });
  }

  goToLogin() {
    this.route.navigateByUrl('');
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.route.navigateByUrl('');
    this.isLoggedIn=false;
  }
}
