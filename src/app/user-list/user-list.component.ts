import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener, Input, Output } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { TemperatureServiceService } from '../services/temperature-service.service';
import { TempService } from '../temp.service';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AddRecordComponent } from '../add-record/add-record.component';
import { EventEmitter } from 'protractor';
import { ToastService } from '../toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
  
})
export class UserListComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable:MdbTableDirective;
  @ViewChild('myForm') myForm:NgForm;

   EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
   EXCEL_EXTENSION = '.xlsx';
  
  elements:any=[];
  previous: any = [];
  searchText: string = ''; 
  search:any={}; 
  startDate:any;
  endDate:any;
  headElements = ['Employee Name', 'Designation', 'Company Name', 'Email', 'Edit', 'Delete'];
  
  


  @HostListener('input') oninput() 
  { 
    this.searchItems();
  } 

  constructor(private cdRef: ChangeDetectorRef,private routeAc:ActivatedRoute, private ts:TemperatureServiceService,private myService:TempService,private userService:UserService,
    private route:Router,private toastService:ToastService,private spinner: NgxSpinnerService,private dialog: MatDialog ) {
      this.spinner.show();
     }

  ngOnInit() {
    if(history.state.message=="updateSuccess")
    this.toastService.showSuccess('User Updated successfully!', 'Success');

    if(history.state.message=="notFound")
    this.toastService.showError('User not Found !', 'Error');

    console.log(history.state.message+"kkkkkkkkkkkk");
    
    this.userService.getuserList().subscribe((response:any)=>{
      this.elements= response.body;
      this.mdbTable.setDataSource(this.elements);
      this.previous = this.mdbTable.getDataSource();
      this.spinner.hide();
      });
  }

  onSubmitForm(){
    
    this.search.startDate=this.startDate;
    this.search.endDate=this.endDate;
     this.myService.fetchTemperaturesOnSearch(this.search).subscribe((response:any)=>{
      this.elements= response.body;
      this.mdbTable.setDataSource(this.elements);
      this.previous = this.mdbTable.getDataSource();
     })
  }

  setStartDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.value;
    const locale = 'en-US';
     this.startDate = formatDate(myDate, format, locale);
  }

  setEndDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.value;
    const locale = 'en-US';
     this.endDate = formatDate(myDate, format, locale);
  }

  ngAfterViewInit() {
  
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateLastItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() { 
   
    const prev = this.mdbTable.getDataSource(); 
    if (!this.searchText) {
  this.mdbTable.setDataSource(this.previous); 
  this.elements =this.mdbTable.getDataSource(); 
  } 
  if (this.searchText) { 
    this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
  this.mdbTable.setDataSource(prev); 
  } 
  }
  excel() {
     const name='Temperature_Data from '+this.startDate+" to "+this.endDate;
     const excelData:any=[];
     this.elements.forEach(element => {
       let obj = {
        'Employee Name':element.appUser?.name,
        'Shift':element.shift,
        'Temperature Reading':element.reading?element.reading:element.noReading,
        'Date':element.date
       }
      excelData.push(obj);
     }); 
     this.exportAsExcelFile(excelData,name)
  }
 
  
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }
  editRow(el) {
   
     this.route.navigate(["/edit",el.id]);
    
  }
  removeRow(el) {
    this.userService.remove(el.id).subscribe((response:any)=>{
      if(response.status==200){
        this.toastService.showSuccess('User Deleted Successfully', 'Success');
      }
      else
      this.toastService.showError('Something went wrong .Please try again', 'Error');
     });
     const elementIndex = this.elements.findIndex((elem: any) => el === elem);
     this.mdbTable.removeRow(elementIndex);
     this.mdbTable.getDataSource().forEach((el: any, index: any) => {
         el.id = (index + 1).toString();
       });
       this.mdbTable.setDataSource(this.elements); console.log(el);
   
    }
    openDialog(el) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        data:{
          message: 'Are you sure want to delete?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });
     
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          console.log('deleted');
          this.removeRow(el);
        }
      });
    }
}
