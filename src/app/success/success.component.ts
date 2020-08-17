import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  onAddNew() {
    this.route.navigateByUrl('temperature');
  }
  onClose() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('url');
  
    this.route.navigateByUrl('');
  }
}
