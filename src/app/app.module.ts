
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TempStorageComponent } from './temp-storage/temp-storage.component';
import { HeaderComponent } from './header/header.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ShowListComponent } from './show-list/show-list.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRecordComponent } from './add-record/add-record.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingService } from './loading.service';
import { CustomFormsModule } from 'ng2-validation';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [ 
    AppComponent,
    TempStorageComponent,
    HeaderComponent,
    ShowListComponent,
    LoginComponent,
    AddRecordComponent,
    UserListComponent,
    ConfirmationDialogComponent,
    DashboardComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatSortModule,
    HttpClientModule,
    MatInputModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    CustomFormsModule,
    MatDialogModule

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [ConfirmationDialogComponent],
  providers: [DatePipe, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
