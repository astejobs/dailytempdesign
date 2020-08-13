import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempStorageComponent } from './temp-storage/temp-storage.component';
import { ShowListComponent } from './show-list/show-list.component';
import { LoginComponent } from './login/login.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoadingService } from './loading.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, 
  {path: 'login', component: LoginComponent, resolve:{         
    login:LoadingService  
  }},
  {path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]  
  },

  {path: 'temperature', component: TempStorageComponent,},
  
  {path: 'temperatures', component: ShowListComponent, 
    resolve:{ temperatures:LoadingService },
    canActivate: [AuthGuard] 
  },
  {path: 'users', component: UserListComponent, 
    resolve:{ users:LoadingService },
    canActivate: [AuthGuard] 
},
  {path: 'add', component: AddRecordComponent,
    resolve:{  add:LoadingService },
    canActivate: [AuthGuard] 
},
  {path: 'edit/:id', component: AddRecordComponent, 
    resolve:{ edit:LoadingService },
    canActivate: [AuthGuard] 
}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
