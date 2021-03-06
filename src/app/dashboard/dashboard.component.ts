import { Component, OnInit } from '@angular/core';
import { TempService } from '../temp.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  updated = Date();
  readingCounts:any=[];
  constructor(private tempService: TempService) { }

  ngOnInit(): void {
    localStorage.setItem('url','dashboard');
    console.log('testing before')
    this.tempService.getData().subscribe((response:any)=>{
      this.readingCounts= response.body;
     console.log('testing')
      });
    this.tempService.getData();
  }
  onRefresh() {
    alert('Data Fetched');
    this.tempService.getData().subscribe((response:any)=>{
      this.readingCounts= response.body;;
      
    });
  }
}
