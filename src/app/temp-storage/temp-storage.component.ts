import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClientModule, HttpHeaders} from  '@angular/common/http';
import { Observable } from 'rxjs';
import { TempService } from '../temp.service';
import { formatDate, DatePipe } from '@angular/common';
import { ok } from 'assert';


@Component({
  selector: 'app-temp-storage',
  templateUrl: './temp-storage.component.html',
  styleUrls: ['./temp-storage.component.scss']
})
export class TempStorageComponent implements OnInit {
options:boolean = true;
check:boolean= true;
temperature:any={};
tempDate:any;
message:string;

maxDate= new Date();
  constructor( private tempService:TempService) { }

  ngOnInit(): void {
  }
  getDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.value;
    const locale = 'en-US';
     this.tempDate = formatDate(myDate, format, locale);
    
  }

  onSubmitForm(){
    this.temperature.date=this.tempDate;
  this.tempService.save(this.temperature).subscribe((response:any)=>{
    if(response.status==200)
    this.message="success";
    else
    this.message="fail";
  }); 
  }
    public clearReading(selectedOption:boolean){
    if(selectedOption==true){
        this.options = true   
        this.temperature.noReading="";
    }
     else{
        this.options=false;
        this.temperature.reading=null;
    }
  }



}
 