import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempStorageComponent } from './temp-storage/temp-storage.component';
import { ShowListComponent } from './show-list/show-list.component';



const routes: Routes = [
  {path: '', redirectTo: 'page1', pathMatch: 'full'}, 
  {path: 'page1', component: TempStorageComponent},
  {path: 'showList', component: ShowListComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
