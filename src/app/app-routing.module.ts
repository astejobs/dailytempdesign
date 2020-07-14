import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempStorageComponent } from './temp-storage/temp-storage.component';
import { ShowListComponent } from './show-list/show-list.component';
import { LoginComponent } from './login/login.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { UserListComponent } from './user-list/user-list.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, 
  {path: 'login', component: LoginComponent},
  {path: 'temperature', component: TempStorageComponent},
  {path: 'temperatures', component: ShowListComponent},
  {path: 'users', component: UserListComponent},
  {path: 'add', component: AddRecordComponent},
  {path: 'edit/:id', component: AddRecordComponent}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
