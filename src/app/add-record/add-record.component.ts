import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import * as moment from 'moment'


@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  @ViewChild('myForm') myForm: NgForm;
  edit:boolean=false;
  tempDate:any;
  user:any={};
  successMsg:string;
  success:boolean;
  errorMsg:string;
  error:boolean;
  
  constructor(private route:ActivatedRoute, private userService:UserService,private router:Router) { 
    
  }

  ngOnInit(): void {  
   if(this.route.snapshot.paramMap.get('id')!=null){
    this.edit=true;
    this.userService.edit(this.route.snapshot.paramMap.get('id')).subscribe((response:any)=>{
    this.user=response.body;
     console.log(this.user);
    /*let dt = new Date(this.user.terminationDate); console.log(dt);
    this.user.terminationDate = dt; */
     });
    }
  }

  onSubmit() {
    this.user.terminationDate=this.tempDate;
    this.userService.updateUser(this.user).subscribe((response:any)=>{
        if(response.status==200){
          if(this.edit){
              this.router.navigateByUrl('/users');
          }
            this.showSuccessMessage('User saved successfully');
            this.myForm.resetForm();
          }
        else
          this.showErrorMessage('Something went wrong .Please try again');
      }); 
  }
  /* onSubmitClick(frm) {
    submitted = true;
  } */
  getDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.value;
    const locale = 'en-US';
     this.tempDate = formatDate(myDate, format, locale);
     //this.tempDate.moment().format('DD-MM-YYYY');
    console.log(this.tempDate);
  }

  showSuccessMessage(msg){
    this.error=false;
    this.success=true;
    this.successMsg=msg;
  }
  showErrorMessage(msg){
    this.success=false;
    this.error=true;
    this.errorMsg=msg;
  }
}
