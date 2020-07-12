import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  addForm = new FormGroup({
    name: new FormControl(''),
    company: new FormControl(''),
    nric: new FormControl(''),
    nric1: new FormControl(''),
    combine: new FormControl(''),
    termDate: new FormControl(''),
    email: new FormControl(''),
    department: new FormControl(''),
    section: new FormControl(''),
    designation: new FormControl('')
  });

  tempDate:any;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addForm.value);
  }

  getDate() {
    const format = 'dd-MM-yyyy';
    const myDate = this.addForm.controls['termDate'];
    const locale = 'en-US';
    this.tempDate = formatDate(myDate.value, format, locale);
    console.log(this.tempDate);
  }
}
