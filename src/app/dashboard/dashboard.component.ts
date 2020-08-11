import { Component, OnInit } from '@angular/core';
import { TempService } from '../temp.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  updated = Date();
  constructor(private tempService: TempService) { }

  ngOnInit(): void {
    this.tempService.getData();
  }
  onRefresh() {
    this.tempService.getData();
    alert('Data Fetched');
  }
}
