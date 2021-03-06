import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { TemperatureServiceService } from '../services/temperature-service.service';
import { TempService } from '../temp.service';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { UserService } from '../user.service';
import { ToastService } from '../toast.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit{
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable:MdbTableDirective;
  @ViewChild('myForm') myForm:NgForm;
   EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
   EXCEL_EXTENSION = '.xlsx';

  elements:any=[];
  previous: any = [];
  searchText: string = ''; 
  search:any={}; 
  searchForUnreported:any={};
  startDate:any;
  endDate:any;
  date:any;
  companyName:any;
  department:any;
  headElements = ['Employee Name', 'Shift', 'Temperature Reading', 'Date'];
  companies=[];
  departments=[];
  @HostListener('input') oninput() 
  { 
    this.searchItems();
  } 

  constructor(private cdRef: ChangeDetectorRef, private ts:TemperatureServiceService,private myService:TempService,
              private userService:UserService, private toastService: ToastService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.userService.getCompanies().subscribe((response:any)=>{
      this.companies= response.body;
      
    });
    this.userService.getDepts().subscribe((response:any)=>{
      this.departments= response.body;
      
    });
  }

  onSubmitForm(){
    this.spinner.show();
    this.search.startDate=this.startDate;
    this.search.date=this.endDate;
     this.myService.fetchTemperaturesOnSearch(this.search).subscribe((response:any)=>{
      this.elements= response.body;
      this.mdbTable.setDataSource(this.elements);
      this.previous = this.mdbTable.getDataSource();
      this.toastService.showInfo('Data fetched successfully!', 'Success');
      this.spinner.hide();
     })
  }

  onSubmitForm2() {
    console.log(this.searchForUnreported);
    this.searchForUnreported.date=this.date;
    this.myService.fetchUnreportedEmployees(this.searchForUnreported).subscribe((data:Blob)=>{
      var blob = new Blob([data], {type: 'application/vnd.ms-excel'});

      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Unreported_Employees of "+this.searchForUnreported.date+".xls";
      link.click();
    });
    this.toastService.showSuccess('Form submitted Successfully!', 'Success');
  }

  setDate(dt) {
    const format = 'dd-MM-yyyy';
    const myDate = dt.value;
    const locale = 'en-US';
     this.date = formatDate(myDate, format, locale);
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
    this.search.startDate=this.startDate;
    this.search.date=this.endDate;
    this.myService.fetchReportedEmployees(this.search).subscribe((data:Blob)=>{
      var blob = new Blob([data], {type: 'application/vnd.ms-excel'});

      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Reported_Employees of "+"/"+this.search.date+".xls";
      link.click();
    });
    this.toastService.showSuccess('Form submitted Successfully!', 'Success');

    /*
     const name='Temperature_Data from '+this.startDate+" to "+this.endDate;
     const excelData:any=[];
     this.elements.forEach(element => {
       let obj = {
        'Employee Name':element.appUser?.name,
        'Shift':element.shift,
        'Temperature Reading':element.reading?element.reading:element.noReading,
        'Date':element.date,
        'Company Name':element.appUser?.companyName,
        'Department':element.appUser?.department
       }
      excelData.push(obj);
     }); 
     this.exportAsExcelFile(excelData,name)*/
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
    console.log(el);
    /* const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(ModalEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
        this.elements[elementIndex] = newElement;
      });
      this.mdbTable.setDataSource(this.elements);
    } */
  }
  removeRow(el) {
    console.log(el);
   /*  const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
        el.id = (index + 1).toString();
      });
      this.mdbTable.setDataSource(this.elements);
    } */
  }
  
}
