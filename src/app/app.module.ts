
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

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



@NgModule({
  declarations: [
    AppComponent,
    TempStorageComponent,
    HeaderComponent,
    ShowListComponent,
    LoginComponent
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
