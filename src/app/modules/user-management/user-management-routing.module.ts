import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: 'liste-user', component: ListeUserComponent },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'users/add', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent},
  { path: '', redirectTo: 'liste-user', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class UserManagementRoutingModule { }
