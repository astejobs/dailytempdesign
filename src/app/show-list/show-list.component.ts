import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { TemperatureServiceService } from '../services/temperature-service.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit{
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable:MdbTableDirective;
  elements: any = [];
  previous: any = [];
  searchText: string = ''; 
  headElements = ['Employee Name', 'Shift', 'Temperature Reading', 'Date'];

  @HostListener('input') oninput() 
  { 
    this.searchItems();
  } 

  constructor(private cdRef: ChangeDetectorRef, private ts:TemperatureServiceService) { }

  ngOnInit() {
    for (let i = 1; i <= 15; i++) {
      this.elements.push({name: 'Taha Latief', shift: 'Evening ' , reading:  i, date: '2-06-2020 '});
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

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
 
  fetchReading() {
    this.ts.getReading().subscribe(data => {
      console.log(data);
    })
  }
  
}
