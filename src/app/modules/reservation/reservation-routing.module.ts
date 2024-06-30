import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientReservationComponent } from './component/client-reservation/client-reservation.component';
import { MesReservationsComponent } from './component/mes-reservations/mes-reservations.component';
import { AdminReservationComponent } from './component/admin-reservation/admin-reservation.component';

const routes: Routes = [
  { path: 'home', component: ClientReservationComponent },
  { path: 'mes-reservations', component: MesReservationsComponent },
  { path: 'all-reservations', component: AdminReservationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
