import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClientModule, HttpHeaders} from  '@angular/common/http';
import { Observable } from 'rxjs';
import { TempService } from '../temp.service';
import { formatDate, DatePipe } from '@angular/common';
import { ok } from 'assert';
import { Router, NavigationEnd } from '@angular/router';
import { ToastService } from '../toast.service';
import { NgxSpinnerService } from 'ngx-spinner';


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
inHospital:boolean = false;
isDormitory:boolean = false;
inHotel:boolean = false;
leaveToday:boolean= false;

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

@ViewChild('msgdiv') el:ElementRef;
  constructor( private tempService:TempService, private route:Router, 
               private toastService: ToastService,private datePipe: DatePipe,
               private spinner: NgxSpinnerService) {
    
  }

   
  ngOnInit(): void { 
    this.spinner.show();
    this.temperature.date= new Date().toISOString().substring(0, 10);
    console.log("in init"+this.temperature.date);
    this.tempService.getUser(localStorage.getItem('user')).subscribe((response:any)=>{
    this.userdetails=response.body;  
    this.spinner.hide();
   }); 

  }
  getDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.onleaveue;
    const locale = 'en-US';
    this.tempDate = formatDate(myDate, format, locale);
  }
 

  onSubmitForm(frm){
 
    this.temperature.date=this.datePipe.transform(this.temperature.date,"dd-MM-yyyy");
    this.temperature.reading=this.tempReading;

  this.tempService.save(this.temperature).subscribe((response:any)=>{
    if(response.status==200){
    this.toastService.showSuccess('Data Saved Successfully','Success')
    this.panelIndex=0;
  
    console.log(frm.onleaveue+"form onleaveues");
    this.currentPanel='step1';
    }
    else{
    this.toastService.showError('Data Not Saved','Error');
    }
  }); 
  
   frm.resetForm();
   this.temperature.reading='';
   //window.location.reload();
   this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.route.navigate(['temperature']);
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

showLeaveType(e, onleave) {
  console.log(e.target.value)
  let inhospital = false;
  let dormitory = false;
  let hotel = false;
  let leave = false;
  if(e.target.value == 'hospital') {inhospital=true;}
  if(e.target.value == 'dormitory') {dormitory=true;}
  if(e.target.value == 'hotel') {hotel=true;}
  if(e.target.value == 'leave') {leave=true;}
  this.inHospital = inhospital;
  this.isDormitory = dormitory;
  this.inHotel = hotel;
  this.leaveToday = leave;
  this.onLeave = onleave; 
  //console.log(inhospital);console.log(onleave);
  //console.log(this.panels.length);console.log(this.panels);
  if(inhospital && this.panels.length == 7) {
    this.inHospital=true;
    this.panels.splice(4, 2); //console.log('in Hospital del 3'+this.panels);
  }
  else if(inhospital && this.panels.length == 6) {
    this.inHospital=true;
    this.panels.splice(3, 2); //console.log('in Hospital del 2'+this.panels);
    this.panels.splice(3, 0, 'step4');
  }
  else if(!inhospital && this.panels[3]!='step4' && onleave && this.panels.length<5) {
    this.panels.splice(3, 0, 'step4');
    this.panels.splice(4, 0, 'step5');
    this.panels.splice(5, 0, 'step6'); //console.log('Not in Hospital add 3'+this.panels);
  }
  else if(!inhospital && !onleave && this.panels.length == 5) {
    if(this.panels[3]=='step4') { this.panels.splice(3, 1); }
    this.panels.splice(3, 0, 'step5');
    this.panels.splice(4, 0, 'step6'); //console.log('Not in Hospital add 2'+this.panels);
  }
  else {
    this.inHospital=false;
    if(!onleave && this.panels[3]=='step4')
    {this.panels.splice(3, 1);  }//console.log(this.panels);
    if(onleave && this.panels[3]!='step4')
    {this.panels.splice(3, 0, 'step4'); }//console.log(this.panels);
  }console.log(this.panels);
}

checkLeaveType() {
  if(this.inHotel) {
    this.reset_filter();
    this.onNext(this.panels.length -2);
  }
  if(this.leaveToday) {
    this.reset_filter();
    this.onNext(this.panels.length -2);
  }
}
onPrevious(index){
    this.panelIndex--;
    this.currentPanel=this.panels[+index-1];
}
checkReading(reading,frm) {
  this.tempReading=reading.value;
  if((reading.value>37.4 || reading.value<=34.9) && (this.tempReading.toString().length >=2) ){
    this.onNext(this.panels.length -2);
    frm.controls['reading'].reset();
   }
  }
  onFlu(frm) {
    this.hasFlu = true; 
    this.reset_filter();
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
 