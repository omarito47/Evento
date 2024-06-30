import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavSplitComponent } from './nav-split/nav-split.component';
import { NavbarV2Component } from './navbar-v2/navbar-v2.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/type-event-managment/type-event-managment.module').then((m) => m.TypeEventManagmentModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/event-managment/event-managment.module').then((m) => m.EventManagmentModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../modules/reservation/reservation.module').then((m) => m.ReservationModule),
      },

    ],
  },
  {
    path: 'nav2', component: NavbarV2Component,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/reservation/reservation.module').then((m) => m.ReservationModule),
      },
    ],
  },
  {
    path: 'nav-split', component: NavSplitComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaoutRoutingModule { }
