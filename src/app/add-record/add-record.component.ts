import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ToastService } from '../toast.service';

import {BehaviorSubject} from 'rxjs'; 


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
 
  
  constructor(private route:ActivatedRoute, private userService:UserService,private router:Router,
              private toastService:ToastService) { 
    
  }

  ngOnInit(): void {  

   if(this.route.snapshot.paramMap.get('id')!=null){
    this.edit=true;
    this.userService.edit(this.route.snapshot.paramMap.get('id')).subscribe((response:any)=>{
      if(response.body==null){
        this.router.navigate(['/users'],{ state: { message:"notFound"} });


    }
      else{
     this.user=response.body;     
     console.log(this.user);
      }
     });
    }
  }

  onSubmit() {    
    //this.user.terminationDate=this.tempDate; 
    console.log(this.user);
    this.userService.updateUser(this.user,this.edit).subscribe((response:any)=>{
        if(response.status==200){
          if(this.edit){
              this.router.navigate(['/users'],{ state: { message:"updateSuccess"} });
          }else{
            this.toastService.showSuccess('User saved successfully!', 'Success');
            this.myForm.resetForm();
          }
          }
        else{
          this.toastService.showError('Something went wrong .Please try again', 'Error');
        }
      }); 
  }
  
  getDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt;
    const locale = 'en-US';
     this.tempDate = formatDate(myDate, format, locale);
     this.user.terminationDate = this.tempDate;
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
