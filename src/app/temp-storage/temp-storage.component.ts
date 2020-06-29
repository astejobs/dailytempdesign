import { Component, OnInit } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import { formatDate, DatePipe } from '@angular/common';


export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMM YYYY',
  },
};
@Component({
  selector: 'app-temp-storage',
  templateUrl: './temp-storage.component.html',
  styleUrls: ['./temp-storage.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
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
