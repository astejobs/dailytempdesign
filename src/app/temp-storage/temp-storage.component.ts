import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp-storage',
  templateUrl: './temp-storage.component.html',
  styleUrls: ['./temp-storage.component.scss']
})
export class TempStorageComponent implements OnInit {
options:boolean = true;
check:boolean= true;
  constructor() { }

  ngOnInit(): void {
  }
  
}
