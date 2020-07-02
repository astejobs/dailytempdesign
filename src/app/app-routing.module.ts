import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempStorageComponent } from './temp-storage/temp-storage.component';
import { ShowListComponent } from './show-list/show-list.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, 
  {path: 'login', component: LoginComponent},
  {path: 'temperature', component: TempStorageComponent},
  {path: 'showReading', component: ShowListComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
