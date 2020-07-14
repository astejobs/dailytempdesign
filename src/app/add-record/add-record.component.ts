import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';



@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  
  edit:boolean=false;
  tempDate:any;
  temp:any={};
  message:string;
  
  constructor(private route:ActivatedRoute, private userService:UserService) { 
    
  }

  ngOnInit(): void {  
   if(this.route.snapshot.paramMap.get('id')!=null){
    this.edit=true;
    this.userService.edit(this.route.snapshot.paramMap.get('id')).subscribe((response:any)=>{
    this.temp=response.body;
     });
    }
  }

  onSubmit(frm) {
    console.log(frm.value);
    this.temp.terminationDate=this.tempDate;
    if(this.edit){
    this.userService.updateUser(this.temp).subscribe((response:any)=>{
      if(response.status==200)    
    this.message="success";
      else
      this.message="fail";
    }); 
    }else{
      console.log("i am in save");
    }
    }

  getDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.value;
    const locale = 'en-US';
     this.tempDate = formatDate(myDate, format, locale);
    console.log(this.tempDate);
  }
}
