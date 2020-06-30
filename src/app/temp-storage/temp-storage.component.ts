import { Component, OnInit } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';


@Component({
  selector: 'app-temp-storage',
  templateUrl: './temp-storage.component.html',
  styleUrls: ['./temp-storage.component.scss']
})
export class TempStorageComponent implements OnInit {
options:boolean = true;
check:boolean= true;
tempDate:any;
  constructor() { }

  ngOnInit(): void {
  }
  getdate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.value;
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    console.log(formattedDate);
  }
}
