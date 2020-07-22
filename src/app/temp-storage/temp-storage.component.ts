import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClientModule, HttpHeaders} from  '@angular/common/http';
import { Observable } from 'rxjs';
import { TempService } from '../temp.service';
import { formatDate, DatePipe } from '@angular/common';
import { ok } from 'assert';
import { Router, NavigationEnd } from '@angular/router';
import { ToastService } from '../toast.service';


@Component({
  selector: 'app-temp-storage',
  templateUrl: './temp-storage.component.html',
  styleUrls: ['./temp-storage.component.scss']
})
export class TempStorageComponent implements OnInit {
  @ViewChild('myForm')
myForm: NgForm;
options:boolean = true;
check:boolean= true;
temperature:any={};
tempDate:any;
message:string;
onLeave:boolean = false;
hasFlu:boolean = false;


dec1:boolean = true;
dec2:boolean = false;
dec3:boolean = true;
panels:any = ['step1','step2','step3','step4','step5','step6', 'step7']
currentPanel = 'step1';
panelIndex=0;
userdetails:any=[];
mySubscription: any;
tempReading:any;

maxDate= new Date();
minDate=new Date();
@ViewChild('msgdiv') el:ElementRef;
  constructor( private tempService:TempService, private route:Router, private toastService: ToastService) {
   
  }

   
  ngOnInit(): void { 
   this.tempService.getUser(localStorage.getItem('user')).subscribe((response:any)=>{
    this.userdetails=response.body;    
   });
  }
  getDate(dt) {
    const format = 'dd-MM-yyyy';
  const myDate = dt.value;

    const locale = 'en-US';
     this.tempDate = formatDate(myDate, format, locale);
  }

  onSubmitForm(frm){
    this.temperature.date=this.tempDate;
    this.temperature.reading=this.tempReading;

  this.tempService.save(this.temperature).subscribe((response:any)=>{
    if(response.status==200){
    this.toastService.showSuccess('Data Saved Successfully','Success')
    this.panelIndex=0;
  
    console.log(frm.value+"form values");
    this.currentPanel='step1';
    }
    else{
    this.toastService.showError('Data Not Saved','Error');
    }
  }); 
   frm.resetForm();
   this.temperature.reading='';
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
    ToggleDec1(selectedOption:boolean){
    if(selectedOption==true){
        this.dec1 = true   
    }
     else{
        this.dec1=false;
    }
  }
    ToggleDec2(selectedOption:boolean){
    if(selectedOption==true){
        this.dec2 = true   
    }
     else{
        this.dec2=false;
    }
    
  }
    ToggleDec3(selectedOption:boolean){
    if(selectedOption==true){
        this.dec3 = true   
    }
     else{
        this.dec3=false;
    }
  }

  onNext(index){ 
    console.log(index+"panelll"); 
    this.panelIndex++; console.log(this.panelIndex)
    this.currentPanel = this.panels[+index+1];
    console.log(this.currentPanel); 

}

showLeaveType(val:boolean) {
  this.onLeave = val; //console.log(this.onLeave);
  if(this.onLeave == false && this.panels[3]=='step4')
  {this.panels.splice(3, 1);  }//console.log(this.panels);
  if(this.onLeave == true && this.panels[3]!='step4')
  {this.panels.splice(3, 0, 'step4'); }//console.log(this.panels);
}

onPrevious(index){
    this.panelIndex--;
    this.currentPanel=this.panels[+index-1];
}
checkReading(reading,frm) {
  this.tempReading=reading.value;
  if(reading.value>37.4){
    this.onNext(this.panels.length -2);
    frm.controls['reading'].reset();
   }
  }
  onFlu(frm) {
    this.hasFlu = true; this.reset_filter();
    this.onNext(this.panels.length -2);
    frm.controls['Symptoms'].reset();
  }
  onNoFlu() {
    this.hasFlu = false;
  }
  reset_filter() {
    this.temperature.symptoms = null;
    this.temperature.travelHistory = null;
    this.temperature.contacted = null;
    this.temperature.quarantine = null;
   }

  showWarning() {
    this.onNext(this.panels.length -2);
  }
  

}
 