import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ClientReservationComponent } from './component/client-reservation/client-reservation.component';
import { AdminReservationComponent } from './component/admin-reservation/admin-reservation.component';
import { MesReservationsComponent } from './component/mes-reservations/mes-reservations.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientReservationComponent,
    AdminReservationComponent,
    MesReservationsComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule

  ]
})
export class ReservationModule { }
